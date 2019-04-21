import { Component, OnInit } from '@angular/core';
import teams from '../teams.json';

@Component({
  selector: 'progress-view',
  templateUrl: './progress-view.component.html',
  styles: []
})
export class ProgressViewComponent implements OnInit {

  teamList = [];
  totalRounds = 0;
  current = 1;
  previous = 0;
  interval :any ;
  matchArray = [];

  constructor() {
    this.teamList = teams;
    this.genMatches();
    this.startMatch()
   }
  
  ngOnInit() {
  }

   genMatches () {
    var nTeams = this.teamList.length;
    while (nTeams > 1) {
        nTeams = (nTeams + 1) >> 1;
        var matches = [];
        this.matchArray.push(matches);
    }
    this.totalRounds = this.matchArray.length;
  }

  
  startMatch(){
    this.matchArray.unshift(this.teamList);
    this.interval = setInterval(()=>{
      this.startNextRound();
    }, 10000);
  }

  startNextRound(){
    this.matchArray[this.current] = [];
    for(var i = 0 ; i < this.matchArray[this.previous].length;i++){
      var max = i+1;
      var min = i ;
      var winningTeamIndex ;
      if(this.matchArray[this.previous].length%2 == 0){
         winningTeamIndex = Math.floor(Math.random() * (max - min + 1) ) + min;
      }else{
         winningTeamIndex = Math.floor(Math.random() * (max - min ) ) + min;
      }
      this.matchArray[this.current].push(this.matchArray[this.previous][winningTeamIndex])
      i++
    }

    if(this.totalRounds > this.current){
      this.current++;
      this.previous++;
    }else{
      clearInterval(this.interval);
    }
    
  }

}
