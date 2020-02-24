import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SharedService {
  private subject = new ReplaySubject<any>(1);

  sendMessage(messageType?: any, dataVal?: any) {
    console.log(messageType);
    this.subject.next({ messageType, dataVal });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
