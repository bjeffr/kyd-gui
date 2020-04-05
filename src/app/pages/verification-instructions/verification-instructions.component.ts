import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-verification-instructions',
  templateUrl: './verification-instructions.component.html',
  styleUrls: ['./verification-instructions.component.scss']
})
export class VerificationInstructionsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // @ts-ignore
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    });
  }

  next() {
    this.route.params.subscribe(params => {
      this.router.navigate(['devices/'.concat(params.id).concat('/verify')]).then();
    });
  }

}
