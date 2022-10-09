import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { protocol_FileServerDomain } from '../../../../../env';
import { Configuration, FileService } from '../../../core/FileServer/swagger-gen';

@Injectable({
  providedIn: 'root'
})
export class CustomFileService extends FileService {


  public override configuration = new Configuration();

  constructor(
    override httpClient: HttpClient,
    @Optional() configuration: Configuration) {
    super(httpClient, protocol_FileServerDomain, configuration);
  }
}
