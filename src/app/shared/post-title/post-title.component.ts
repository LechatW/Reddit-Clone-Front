import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {

  faComments = faComments;
  @Input() posts: Array<PostModel> = [];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void { 
    this.router.navigateByUrl('/view-post/' + id);
  }



}
