import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log("Spotify Service Listo");
  }

  getQuery(query:string) {
    
    const url = `https://api.spotify.com/v1/${ query }`;
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("tokenSpotify")}`
    });

    return this.http.get(url, {headers});
  }

  generateTokenSpotify() {
    const clientId = "da237fd547ec421b975bceae1e8095be";
    const clientSecret = "d2245caf07124084a4ff71837dd60d93";

    this.http.get(`https://spotify-get-token.herokuapp.com/spotify/${clientId}/${clientSecret}`)
      .subscribe(data => {
        localStorage.setItem("tokenSpotify", data['access_token']);
      });
  }

  getNewReleases() {

    return this.getQuery("browse/new-releases?limit=20")
            .pipe( map( data => {
              return data['albums'].items;
            }));
  }

  getArtists(termino:string) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
            .pipe( map (data => {
              return data['artists'].items;
            }));

  }

  getArtist(id:string) {
    return this.getQuery(`artists/${id}`);
  }

  getArtistTopTracks(id:string) {
    return this.getQuery(`artists/${id}/top-tracks?country=MX`)
              .pipe( map (data => {
                return data['tracks'];
              }));
  }

}
