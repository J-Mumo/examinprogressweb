import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-room',
  templateUrl: './exam-room.component.html',
  styleUrls: ['./exam-room.component.scss']
})
export class ExamRoomComponent implements OnInit {
  // @ViewChild('localVideoElement') localVideoElement: any;
  // localVideo;
  examId = Number(this.activatedRoute.snapshot.paramMap.get('examId'));
  constraints = {
    audio: true,
    video: true
  };
  offerOptions = { offerToReceiveVideo: 1, offerToReceiveAudio: 1 };
  startTime = null;
  remoteVideo = (document.querySelector('#remoteVideo')) as HTMLVideoElement;
  remoteStream;
  localStream;
  localPeerConnection;
  remotePeerConnection;
  // callButton = document.getElementById('callButton');
  // hangupButton = document.getElementById('hangupButton');

  constructor(
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    navigator.mediaDevices.getUserMedia(this.constraints)
    .then(stream => {
      console.log('Got MediaStream:', stream);
      const videoElement = document.querySelector('video');
      this.localStream = stream;
      videoElement.srcObject = stream;
    })
    .catch(error => {
      console.error('Error accessing media devices.', error);
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        alert('Required track is missing');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
          alert('Webcam or mic are already in use');
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
          alert('Constraints can not be satisfied by avb. devices');
      } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          alert('Permission denied in browser');
      } else if (error.name === 'TypeError' || error.name === 'TypeError') {
          alert('Empty constraints object');
      } else {
          // other errors
      }
    });

    // navigator.mediaDevices.getUserMedia(this.constraintObj).then((mediaStream) => {
    //     const video = document.querySelector('video');
    //     this.localStream = mediaStream;
    //     video.srcObject = mediaStream;
    //     video.onloadedmetadata = (e) => {
    //       video.play();
    //     };
    //   });
  }

  callAction() {
  //   this.startTime = window.performance.now();
    const servers = null;  // Allows for RTC server configuration.

    // Create peer connections and add behavior.
    this.localPeerConnection = new RTCPeerConnection(servers);
    this.localPeerConnection.addEventListener('icecandidate', this.handleConnection);
    this.localPeerConnection.addEventListener('iceconnectionstatechange', this.handleConnectionChange);
    this.remotePeerConnection = new RTCPeerConnection(servers);
    this.remotePeerConnection.addEventListener('icecandidate', this.handleConnection);
    this.remotePeerConnection.addEventListener('iceconnectionstatechange', this.handleConnectionChange);
    this.remotePeerConnection.addEventListener('addstream', this.gotRemoteMediaStream);

    // Add local stream to connection and create offer to connect.
    this.localPeerConnection.addStream(this.localStream);
    this.trace('Added local stream to localPeerConnection.');
    this.trace('localPeerConnection createOffer start.');
    // this.localPeerConnection.createOffer().then(function(offer) {
    //   return this.localPeerConnection.setLocalDescription(offer);
    // });
    this.localPeerConnection.createOffer(this.offerOptions).then(this.createdOffer).catch(this.setSessionDescriptionError);
  }

  // Handles remote MediaStream success by adding it as the remoteVideo src.
  gotRemoteMediaStream(event) {
    const mediaStream = event.stream;
    this.remoteVideo.srcObject = mediaStream;
    this.remoteStream = mediaStream;
    this.trace('Remote peer connection received remote stream.');
  }

  handleConnection(event) {
    const peerConnection = event.target;
    const iceCandidate = event.candidate;

    if (iceCandidate) {
      const newIceCandidate = new RTCIceCandidate(iceCandidate);
      const otherPeer = this.getOtherPeer(peerConnection);

      otherPeer.addIceCandidate(newIceCandidate)
        .then(() => {
          this.handleConnectionSuccess(peerConnection);
        }).catch((error) => {
          this.handleConnectionFailure(peerConnection, error);
        });

      this.trace(`${this.getPeerName(peerConnection)} ICE candidate:\n` +
            `${event.candidate.candidate}.`);
    }
  }

  // Logs that the connection succeeded.
  handleConnectionSuccess(peerConnection) {
    this.trace(`${this.getPeerName(peerConnection)} addIceCandidate success.`);
  }

  // Logs that the connection failed.
  handleConnectionFailure(peerConnection, error) {
    this.trace(`${this.getPeerName(peerConnection)} failed to add ICE Candidate:\n` +
          `${error.toString()}.`);
  }

  // Logs changes to the connection state.
  handleConnectionChange(event) {
    const peerConnection = event.target;
    console.log('ICE state change event: ', event);
    this.trace(`${this.getPeerName(peerConnection)} ICE state: ` +
          `${peerConnection.iceConnectionState}.`);
  }

  // Gets the "other" peer connection.
  getOtherPeer(peerConnection) {
    return (peerConnection === this.localPeerConnection) ?
    this.remotePeerConnection : this.localPeerConnection;
  }

  // Logs offer creation and sets peer connection session descriptions.
  createdOffer(description) {
    this.trace(`Offer from localPeerConnection:\n${description.sdp}`);
    this.trace('localPeerConnection setLocalDescription start.');
    this.localPeerConnection.setLocalDescription(description)
      .then(() => {
        this.setLocalDescriptionSuccess(this.localPeerConnection);
      }).catch(this.setSessionDescriptionError);

    this.trace('remotePeerConnection setRemoteDescription start.');
    this.remotePeerConnection.setRemoteDescription(description)
      .then(() => {
        this.setRemoteDescriptionSuccess(this.remotePeerConnection);
      }).catch(this.setSessionDescriptionError);

    this.remotePeerConnection.createAnswer()
      .then(this.createdAnswer)
      .catch(this.setSessionDescriptionError);
  }

  // Logs error when setting session description fails.
  setSessionDescriptionError(error) {
    this.trace(`Failed to create session description: ${error.toString()}.`);
  }

  // Logs an action (text) and the time when it happened on the console.
  trace(text) {
    text = text.trim();
    const now = (window.performance.now() / 1000).toFixed(3);

    console.log(now, text);
  }

  // Logs success when localDescription is set.
  setLocalDescriptionSuccess(peerConnection) {
    this.setDescriptionSuccess(peerConnection, 'setLocalDescription');
  }

  // Logs success when setting session description.
  setDescriptionSuccess(peerConnection, functionName) {
    const peerName = this.getPeerName(peerConnection);
  }

  // Gets the name of a certain peer connection.
  getPeerName(peerConnection) {
    return (peerConnection === this.localPeerConnection) ?
        'localPeerConnection' : 'remotePeerConnection';
  }

  // Logs success when remoteDescription is set.
  setRemoteDescriptionSuccess(peerConnection) {
    this.setDescriptionSuccess(peerConnection, 'setRemoteDescription');
  }

  // Logs answer to offer creation and sets peer connection session descriptions.
  createdAnswer(description) {
    this.trace(`Answer from remotePeerConnection:\n${description.sdp}.`);

    this.trace('remotePeerConnection setLocalDescription start.');
    this.remotePeerConnection.setLocalDescription(description)
      .then(() => {
        this.setLocalDescriptionSuccess(this.remotePeerConnection);
      }).catch(this.setSessionDescriptionError);

    this.trace('localPeerConnection setRemoteDescription start.');
    this.localPeerConnection.setRemoteDescription(description)
      .then(() => {
        this.setRemoteDescriptionSuccess(this.localPeerConnection);
      }).catch(this.setSessionDescriptionError);
  }
}
