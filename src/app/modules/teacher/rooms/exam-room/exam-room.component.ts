import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { RtcTokenRequest, RtcTokenResponse } from './exam-room-request-response';
import { ExamRoomService } from './exam-room.service';

@Component({
  selector: 'app-exam-room',
  templateUrl: './exam-room.component.html',
  styleUrls: ['./exam-room.component.scss']
})
export class ExamRoomComponent implements OnInit {
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  remoteCalls: string[] = [];
  localCallId = 'agora_local';

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  private token: string;
  private channelName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private examRoomService: ExamRoomService,
    private ngxAgoraService: NgxAgoraService) {}

  ngOnInit(): void {
    this.getRtcToken();
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();
    this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    this.initLocalStream();
    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));    
  }

  getRtcToken() {
    this.channelName = this.examId.toString();
    const student = false;
    const examTokenId = null;
    const request = new RtcTokenRequest(this.channelName, student, examTokenId)
    this.examRoomService.getRtcToken(request).subscribe(
      (response: RtcTokenResponse) => {
        this.token = response.token;
        this.uid = response.uid;
      }
    )
  }

  /**
   * Attempts to connect to an online chat room where users can host and receive A/V streams.
   */
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(this.token, this.channelName, this.uid, onSuccess, onFailure);
  }

  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      this.remoteCalls.push(id);
      setTimeout(() => stream.play(id), 1000);
      console.log('Remote calls: ',this.remoteCalls)
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  muteAudio(callId) {
    this.localStream.muteAudio()
    document.getElementById('mic-on').hidden = true
    document.getElementById('mic-off').hidden = false
  }

  unMuteAudio(callId) {
    this.localStream.unmuteAudio()
    document.getElementById('mic-on').hidden = false
    document.getElementById('mic-off').hidden = true
  }

  terminateStudentExam(callId) {
    const callId_arr = callId.split('-')
    console.log(callId)
    const examTokenId= callId_arr[callId_arr.length - 1]
    console.log(examTokenId)
    this.examRoomService.terminateStudentExam(examTokenId).subscribe(
      terminated => { console.log(terminated)}
    )
  }
}
