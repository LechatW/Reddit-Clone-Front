import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { PostService } from 'src/app/shared/post.service';
import { SubredditModel } from 'src/app/subreddit/subreddit-response.payload';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { PostRequestPayload } from './post-request.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postRequestPayload: PostRequestPayload;
  subreddits: Array<SubredditModel>;

  constructor(private router: Router, private postService: PostService, private subredditService: SubredditService) { 
    this.postRequestPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    };
  }

  ngOnInit(): void {
  
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
    });

    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });

  }

  createPost() {
    this.postRequestPayload.postName = this.createPostForm.get('postName').value;
    this.postRequestPayload.url = this.createPostForm.get('url').value;
    this.postRequestPayload.description = this.createPostForm.get('description').value;
    this.postRequestPayload.subredditName = this.createPostForm.get('subredditName').value;

    this.postService.createPost(this.postRequestPayload).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    });
  }

  discardPost() {
    this.router.navigateByUrl('/');
  }

}