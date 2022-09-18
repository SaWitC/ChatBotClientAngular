import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { empty } from 'rxjs';
import { protocol_botServerDomain } from '../../../../../env';
import { Configuration, RemindService } from '../../../core/services/swagger-gen';
import { Reminds } from '../../../Models/CommandResponseModels/Reminds/reminds.model';

@Injectable({
  providedIn: 'root'
})
export class RemindCustomService extends RemindService  {
  //@Inject
  //public override configuration = new Configuration();

  public activeReminders: Reminds[];
  public ToRemoveREminders: Reminds[] = [];

  public override configuration = new Configuration();
  
  constructor(override httpClient: HttpClient, @Optional() configuration: Configuration) {
    super(httpClient, protocol_botServerDomain, configuration);
  }

  SetAnyReminds() {


    //let testdd = new Date(2022, 09, 17, 20, 14);
    //console.log(testdd.getTime())
    let a =0;

    for (let remind of this.activeReminders) {
      var res = remind.remindAtTime.match(/[0-9]{1,4}/g);

      var curentDate = new Date();
      a++;

      var curent = curentDate.toISOString().match(/[0-9]{1,4}/g);
      console.log("1r");
      console.log(res);
      console.log(curent);

      //console.log(res.);

      if (res != null && curent != null) {

        var date = new Date(parseInt(res[0]), parseInt(res[1]), parseInt(res[2]), parseInt(res[3]), parseInt(res[4]))
        var curentDate = new Date(parseInt(curent[0]), parseInt(curent[1]), parseInt(curent[2]), curentDate.getHours(), parseInt(curent[4]))


        var minbetwen = (date.getTime() - curentDate.getTime());

        var diffMins = Math.round(((minbetwen % 86400000) % 3600000) / 60000)

        if (date.getTime() <= curentDate.getTime()) {

          this.ToRemoveREminders.push(remind)

          setTimeout(() => {
            alert("remind" + remind.remindMessage);
            this.removeReminder(remind.id).subscribe(res => {
              console.log(remind.remindMessage +"deleted")
            },
              err => console.log("remove error")
            );

          },1000*a)
        }
        else {
          setTimeout(() => {
            alert("remind" + remind.remindMessage);
            
          }, diffMins * 60000)
        }
        console.log("3r");
      }
    }
    this.activeReminders = [];
   
  }
}
