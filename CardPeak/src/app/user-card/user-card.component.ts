import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  animations: [
    trigger('flipState', [
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      state('front', style({
        transform: 'rotateY(0)'
      })),
      transition('back => front', animate('500ms ease-out')),
      transition('front => back', animate('500ms ease-in'))
    ])
  ]
})
export class UserCardComponent implements OnInit {

  private env = environment;
  flip: string = 'front';
  loading: boolean = false;
  emailString: string = 'mailto:';
  btnHover = false;

  user: any = {
    name: {
      first: '...',
      last: '',
      title: ''
    },
    picture: {
      large: this.env.defaultImgUrl
    },
    location: {
      city: '-',
      state: '-',
      street: '-'
    },
    email: '-',
    cell: '-',
    phone: '-'
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRandomUser();
  }

  getRandomUser() {
    this.loading = true;
    this.flip = 'front';
    this.http.get(this.env.userUrl).subscribe((data: any) => {
      if (data && data.results.length > 0) {
        this.user = data.results[0];
        this.emailString += this.user.email + '?subject=Hello From Peaks';
      }
      this.loading = false;
    });
  }

  toggleFlip() {
    this.flip = (this.flip == 'back') ? 'front' : 'back';
  }

  hoverStyle = () => {
    return 'button-hover';
  };

  buttonStyle = () => {
    return ''
  };
}
