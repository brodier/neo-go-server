import { Injectable }    from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Player } from './Player';

@Injectable()
export class PlayerService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private playersUrl = 'api/players';  // URL to web api

  constructor(private http: Http) { }
  
  private extractData(res: Response) {
      console.log("Try calling exract ", res);
      let body = res.json();
      console.log("body contain : ", body);
      return body || [];
    }

  
  getPlayers(): Observable<Player[]> {
      console.log("Call getPlayers");
      return this.http.get(this.playersUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  delete(id: number): Observable<void> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  create(name: string, level: number): Observable<Player> {
    return this.http
      .post(this.playersUrl, JSON.stringify({name: name, level: level}), {headers: this.headers})
      .map(this.extractData).catch(this.handleError);
  }

  update(player: Player): Observable<Player> {
    const url = `${this.playersUrl}/${player.id}`;
    return this.http
      .put(url, JSON.stringify(player), {headers: this.headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
      // In a real world app, you might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
}
