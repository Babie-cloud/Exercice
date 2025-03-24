import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DexieService, Exercise } from '../dexie.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
   exercises: Observable<Exercise[]>;

  constructor(private http: HttpClient, private dexieService: DexieService) { }

  ngOnInit() {
    this.exercises = from(this.dexieService.exercises.toArray()).pipe(
      switchMap(exercises => {
        if (exercises.length === 0) {
          return this.http.get<Exercise[]>('https://api.api-ninjas.com/v1/exercises').pipe(
            switchMap(apiExercises => {
              return from(this.dexieService.exercises.bulkAdd(apiExercises)).pipe(
                switchMap(() => from(this.dexieService.exercises.toArray()))
              );
            })
          );
        } else {
          return from(exercises);
        }
      })
    );
  }
}