import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  constructor(private remoteConfig: AngularFireRemoteConfig) {
  }

  async getFeatureFlag(flagKey: string): Promise<boolean> {
    try {
      const activated = await this.remoteConfig.fetchAndActivate(); 

      const value = this.remoteConfig.getBoolean(flagKey);

      return value;
    } catch (error) {
      return false;
    }
  }

}
