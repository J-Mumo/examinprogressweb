import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

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
  private appID = '703bc0bd4c5c4bc99b4172dd0aecc89e';
  private appCertificate = '7342b2de114e4c4181f6f4c0eb72bb81';
  private channelName: string;
  private role = RtcRole.PUBLISHER;
  private expirationTimeInSeconds = 3600
  private currentTimestamp = Math.floor(Date.now() / 1000)
  private privilegeExpiredTs: number;
  private token: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ngxAgoraService: NgxAgoraService) {
      this.uid = Math.floor(Math.random() * 100);
    }

  ngOnInit(): void {
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();
    this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: false, video: true, screen: false });
    this.assignLocalStreamHandlers();
    this.initLocalStream();
    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));

    this.channelName = this.examId.toString();
    this.privilegeExpiredTs = this.currentTimestamp + this.expirationTimeInSeconds;
    this.token = RtcTokenBuilder.buildTokenWithUid(
      this.appID, this.appCertificate, this.channelName, this.uid, this.role, this.privilegeExpiredTs);
    
    console.log("Token With Integer Number Uid: " + this.token);
    // console.log(
    //   RtcTokenBuilder.buildTokenWithAccount('703bc0bd4c5c4bc99b4172dd0aecc89e', '7342b2de114e4c4181f6f4c0eb72bb81',
    //     'exam', 'Role_Publisher', 0, 0)
    // );
  }

  /**
   * Attempts to connect to an online chat room where users can host and receive A/V streams.
   */
  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(this.token, 
    'exam', this.uid, onSuccess, onFailure);
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
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
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
}
