import { Component, HostListener, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  ExaminprogressResponse, AnswerRequest, SkipQuestionRequest, SkipSectionRequest, RtcTokenResponse, RtcTokenRequest, TerminatedResponse
} from './examinprogress-request-response';
import { ExaminprogressService } from './examinprogress.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CountdownComponent } from 'ngx-countdown';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-examinprogress',
  templateUrl: './examinprogress.component.html',
  styleUrls: ['./examinprogress.component.scss']
})
export class ExaminprogressComponent implements OnInit {
  response: ExaminprogressResponse;
  examTokenId = Number(this.activatedRoute.snapshot.paramMap.get('examTokenId'));
  answerIds: number[] = [];
  answerText: string;
  timeLeftInSeconds = null;
  pause = false;
  selectedRadioOption;
  modalRef: BsModalRef;
  mediaStreamConstraints = {
    video: true,
    audio: true
  };

  // @HostListener('window:keydown',['$event'])
  // onKeyPress($event: KeyboardEvent) {
  //   if(($event.ctrlKey || $event.metaKey) && $event.code == 'KeyC') {
  //     $event.preventDefault();
  //     const message = 'Copy pasting is prohibited';
  //     this.snackBar(message);
  //   }
  //   if(($event.ctrlKey || $event.metaKey) && $event.code == 'KeyV') {
  //     $event.preventDefault();
  //     const message = 'Copy pasting is prohibited';
  //     this.snackBar(message);
  //   }
  // }
  // @HostListener('window:contextmenu',['$event'])
  // onRightClick($event) {
  //   $event.preventDefault()
  // }
  // @HostListener('window:visibilitychange',[])
  // onVisibilityChange() {
  //   const message = 'Focus on your screen. You risk having your screen terminated.';
  //   this.snackBar(message);
  //   this.updateCheatingAttempts()
  // }
  // @HostListener('window:blur',[])
  // onBlur() {
  //   const message = 'Focus on your screen. You risk having your screen terminated.';
  //   this.snackBar(message);
  //   this.updateCheatingAttempts()
  // }
  // @HostListener('window:resize',[])
  // onBrowserResize() {
  //   const message = 'Focus on your screen. You risk having your screen terminated.';
  //   this.snackBar(message);
  //   this.updateCheatingAttempts()
  // }
  
  remoteCalls: string[] = [];
  localCallId = 'agora_local';

  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  private token: string;
  private channelName: string;

  @ViewChild('mediaError')
  private mediaError: TemplateRef<any>;

  @ViewChild('examTerminated')
  private examTerminatedRef: TemplateRef<any>;

  @ViewChild('countDown', { static: false }) countDown: CountdownComponent;
  config = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '10rem',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      [
        'underline',
        'strikeThrough',
        'subscript',
        'superscript', ,
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
      ],
      [
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ngxAgoraService: NgxAgoraService,
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    private modalService: BsModalService,
    private examinprogressService: ExaminprogressService
  ) { }

  ngOnInit(): void {
    this.getUserMedia();
  }

  getUserMedia() {
    navigator.mediaDevices.getUserMedia(this.mediaStreamConstraints).then(function(){
      this.mediaPermissionsGranted = true;
      this.getExamProgress();
    }.bind(this)).catch(this.handleGetUserMediaError.bind(this))
  }

  handleGetUserMediaError(error) {
    console.log(error);
    this.modalRef = this.modalService.show(this.mediaError, { class: 'modal-md' });
    this.router.navigate(['/student/exams'])
  }

  decline() {
    this.modalRef.hide();
  }

  initAgoraStreaming(response) {
    if (!response.examComplete && !response.examExpired && !response.examHasNoQuestions && 
      response.examHasStarted && !response.paused) {

        this.getRtcToken();
        this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
        this.assignClientHandlers();
        this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: false, video: true, screen: false });
        this.assignLocalStreamHandlers();
        this.initLocalStream();
        this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
      }
  }

  getRtcToken() {
    this.channelName = this.response.examId.toString();
    const student = true;
    const request = new RtcTokenRequest(this.channelName, student, this.examTokenId)
    this.examinprogressService.getRtcToken(request).subscribe(
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

  getExamProgress() {
    this.examinprogressService.getExamProgress(this.examTokenId).subscribe(
      (response: ExaminprogressResponse) => {
        this.response = response;
        this.initAgoraStreaming(response);
        this.pause = false;
        if (!response.examComplete) {
          if (response.timedPerExam) {
            this.timeLeftInSeconds = response.examTime;
          } else if (response.timedPerSection) {
            this.timeLeftInSeconds = response.examSectionTransfer.sectionTime;
          } else if (response.timedPerQuestion) {
            if (response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion) {
              this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionTime;
            } else {
              this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTime;
            }
          }
        }
      }
    );
  }

  public trackByFn(index, item) {
    if (!item) { return null; }
    return index;
  }

  getSingleCheckedAnswer(answerId: number) {
    this.answerIds = [];
    this.answerIds.push(answerId);
  }

  getMultipleCheckedAnswer(event, answerId: number) {
    const checkBoxValue = event.checked;

    if (checkBoxValue) {
      this.answerIds.push(answerId);
    } else {
      this.answerIds.splice(this.answerIds.indexOf(answerId), 1);
    }
  }

  onQuestionTimerExpired(event) {
    if (event.action === 'done') {
      this.skipToNextQuestion();
    }
  }

  onSectionTimerExpired(event) {
    if (event.action === 'done') {
      this.skipToNextSection();
    }
  }

  pauseExam() {
    this.pause = true;
  }

  skipToNextQuestion() {
    if (this.response !== undefined && this.response.examSectionTransfer != null) {
      const questionId = this.response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion ?
        this.response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionId :
        this.response.examSectionTransfer.examQuestionTransfer.questionId;
      const request: SkipQuestionRequest = new SkipQuestionRequest(this.examTokenId, questionId, this.pause);
      this.examinprogressService.skipQuestion(request).subscribe(
        (response: ExaminprogressResponse) => {
          this.response = response;
          this.answerIds = [];
          this.answerText = '';
          if (response.paused) {
            this.router.navigate(['/student/exams']);
          } else {
            if (!response.examComplete) {
              if (response.timedPerExam) {
                this.timeLeftInSeconds = response.examTime;
              } else if (response.timedPerSection) {
                this.timeLeftInSeconds = response.examSectionTransfer.sectionTime;
              } else if (response.timedPerQuestion) {
                if (response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion) {
                  this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionTime;
                } else {
                  this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTime;
                }
              }
              this.countDown.left = this.timeLeftInSeconds;
              this.countDown.restart();
            }
          }
        }
      );
    }
  }

  skipToNextSection() {
    if (this.response !== undefined) {
      const sectionId = this.response.examSectionTransfer.sectionId;
      const request: SkipSectionRequest = new SkipSectionRequest(this.examTokenId, sectionId, this.pause);
      this.examinprogressService.skipSection(request).subscribe(
        (response: ExaminprogressResponse) => {
          this.response = response;
          this.answerIds = [];
          this.answerText = '';
          if (response.paused) {
            this.router.navigate(['/student/exams']);
          } else {
            if (!response.examComplete) {
              if (response.timedPerExam) {
                this.timeLeftInSeconds = response.examTime;
              } else if (response.timedPerSection) {
                this.timeLeftInSeconds = response.examSectionTransfer.sectionTime;
              } else if (response.timedPerQuestion) {
                if (response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion) {
                  this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionTime;
                } else {
                  this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTime;
                }
              }
              this.countDown.left = this.timeLeftInSeconds;
              this.countDown.restart();
            }
          }
        }
      );
    }
  }

  terminateExam(event) {
    if (event.action === 'done' && this.response !== undefined) {
      this.examinprogressService.terminateExam(this.examTokenId).subscribe(
        (response: ExaminprogressResponse) => {
          this.response = response;
          this.router.navigate(['/student/exams']);
        }
      );
    }
  }

  onSubmit(form: NgForm) {
    const questionId = this.response.examSectionTransfer.examQuestionTransfer.questionTransfer != null ?
      this.response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionId :
      this.response.examSectionTransfer.examQuestionTransfer.questionId;

    const request: AnswerRequest = new AnswerRequest(this.examTokenId, this.pause, questionId, this.answerIds, this.answerText);

    this.examinprogressService.saveAnswer(request).subscribe(
      (response: ExaminprogressResponse) => {
        this.response = response;
        this.answerIds = [];
        this.selectedRadioOption = false;
        if (!response.examComplete) {
          if (response.timedPerExam) {
            this.timeLeftInSeconds = response.examTime;
          } else if (response.timedPerSection) {
            this.timeLeftInSeconds = response.examSectionTransfer.sectionTime;
          } else if (response.timedPerQuestion) {
            if (response.examSectionTransfer.examQuestionTransfer.comprehensionQuestion) {
              this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTransfer.questionTime;
            } else {
              this.timeLeftInSeconds = response.examSectionTransfer.examQuestionTransfer.questionTime;
            }
          }
        }
      }
    );
  }

  updateCheatingAttempts() {
    if (!this.response.examComplete) {
      this.examinprogressService.updateCheatingAttempts(this.examTokenId).subscribe(
        (res: TerminatedResponse) => {
          if (res.terminated) {
            this.skipToNextQuestion()
            this.modalRef = this.modalService.show(this.examTerminatedRef, { class: 'modal-lg' });
          }
        }
      )
    }
  }

  onExit() {
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }

  snackBar(message) {
    this.translate.get(message).subscribe(( res: string ) => {
      this._snackBar.open( res, '', {
        duration: 20000,
        verticalPosition: 'top'
      });
    });
  }
}
