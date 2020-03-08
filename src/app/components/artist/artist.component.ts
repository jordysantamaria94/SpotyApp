import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styles: []
})
export class ArtistComponent {

  artista: any = {};
  tracks: any[] = [];
  loading: boolean;

  constructor(private route: ActivatedRoute, private spotify: SpotifyService) { 
    this.loading = true;

    this.route.params.subscribe(params => {

      this.getArtist(params['id']);
      this.getArtistTopTracks(params['id']);
      
      this.loading = false;
    });
  }

  async getArtist(id:string) {
    await this.spotify.getArtist(id)
      .subscribe(data => {
        this.artista = data;
      });
  }

  async getArtistTopTracks(id:string) {
    await this.spotify.getArtistTopTracks(id)
      .subscribe(data => {
        console.log(data);
        this.tracks = data;
      });
  }

}
