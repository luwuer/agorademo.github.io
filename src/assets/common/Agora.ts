import AgoraRTC, {
  IAgoraRTCClient,
  ICameraVideoTrack,
  ILocalTrack,
  IMicrophoneAudioTrack
} from "agora-rtc-sdk-ng";
import { callAsyncWithErrorHandle } from "../utils";

type AgoraMode = "live" | "rtc";
type AgoraCodec = "vp8" | "h264";
type AgoraRTCOption = {
  appid: string;
  token: string;
  channel: string;
  mode?: AgoraMode;
  codec?: AgoraCodec;
  handleSuccess: (uid?: any) => void;
  handleError: (err: string) => void;
};

class Agora {
  public appid: string;
  public token: string;
  public channel: string;
  private mode: AgoraMode = "rtc";
  private codec: AgoraCodec = "vp8";
  public client: IAgoraRTCClient;
  public micTrack: IMicrophoneAudioTrack | null;
  public cameraTrack: ICameraVideoTrack | null;
  public joinReady: Promise<number | string> | null;
  public micTrackReady: Promise<IMicrophoneAudioTrack> | null;
  public cameraTrackReady: Promise<ICameraVideoTrack> | null;
  public handleSuccess: (uid?: any) => void;
  public handleError: (err: string) => void;

  constructor(option: AgoraRTCOption) {
    this.appid = option.appid;
    this.token = option.token;
    this.channel = option.channel;
    this.mode = option.mode || this.mode;
    this.codec = option.codec || this.codec;
    this.handleSuccess = option.handleSuccess;
    this.handleError = option.handleError;
    this.micTrack = null;
    this.cameraTrack = null;
    this.joinReady = null;
    this.micTrackReady = null;
    this.cameraTrackReady = null;

    // create client
    this.client = this._creatClient();

    // join channel
    this._joinChannel()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  // render stream to video
  async render(
    local: HTMLElement,
    container: HTMLElement
  ): Promise<{
    micTrack: IMicrophoneAudioTrack;
    cameraTrack: ICameraVideoTrack;
  }> {
    await this.createTracks(local);
    this._subscribeRemoteStream(container);

    return {
      cameraTrack: this.cameraTrack!,
      micTrack: this.micTrack!
    };
  }

  // publish
  async publish(track: ILocalTrack) {
    if (!this.joinReady) return;
    await this.joinReady;
    this.client.publish(track);
  }

  // unpublish
  async unpublish(track: ILocalTrack) {
    if (!this.joinReady) return;
    await this.joinReady;
    this.client.unpublish(track);
  }    

  async createTracks(local: HTMLElement): Promise<boolean> {
    this.micTrackReady = this.createMicTrack();
    this.cameraTrackReady = this.createCameraTrack(local);
    await this.micTrackReady;
    await this.cameraTrackReady;
    return true;
  }

  async createMicTrack(): Promise<IMicrophoneAudioTrack> {
    this.micTrack = await callAsyncWithErrorHandle<IMicrophoneAudioTrack>(
      AgoraRTC.createMicrophoneAudioTrack
    );
    this.micTrack.play();
    this.publish(this.micTrack);

    return this.micTrack;
  }

  async createCameraTrack(local: HTMLElement): Promise<ICameraVideoTrack> {
    this.cameraTrack = await await callAsyncWithErrorHandle<ICameraVideoTrack>(
      AgoraRTC.createCameraVideoTrack
    );
    this.cameraTrack.play(local);
    this.publish(this.cameraTrack);

    return this.cameraTrack;
  }

  closeMicTrack() {
    if (!this.micTrack) return;

    this.client.unpublish([this.micTrack]);
    this.micTrack?.stop();
    this.micTrack?.close();
    this.micTrack = null;
    this.micTrackReady = null;
  }

  closeCameraTrack() {
    if (!this.cameraTrack) return;

    this.client.unpublish([this.cameraTrack]);
    this.cameraTrack?.stop();
    this.cameraTrack?.close();
    this.cameraTrack = null;
    this.cameraTrackReady = null;
  }

  // dispose and close mic and camera
  async dispose() {
    this.closeMicTrack();
    this.closeCameraTrack();
    this.client.remoteUsers.forEach(user => {
      const player = document.getElementById(user.uid.toString());
      player && player.remove();
    });
    this.client.leave();
  }

  private _creatClient(): IAgoraRTCClient {
    return AgoraRTC.createClient({
      mode: this.mode,
      codec: this.codec
    });
  }

  private _joinChannel(): Promise<number | string> {
    this.joinReady = this.client.join(this.appid, this.channel, this.token);
    return this.joinReady;
  }

  private _subscribeRemoteStream(container: HTMLElement) {
    // create
    this.client.on("user-published", async (user, mediaType) => {
      // subscibe remote-user
      await this.client.subscribe(user, mediaType);

      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const player = document.createElement("div");
        player.id = user.uid.toString();
        player.style.width = "100%";
        player.style.height = "100%";
        container.append(player);

        remoteVideoTrack!.play(player);
      }

      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack!.play();
      }
    });

    // destroy
    this.client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "video") {
        const player = document.getElementById(user.uid.toString());
        player && player.remove();
      }
    });
  }
}

export default Agora;
