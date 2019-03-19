import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Md5]
})
export class AppComponent implements OnInit {
  public str: string;
  public hash: any;
  public arr: Md5;
  public rgb: number[];
  public hex: number[];
  
  constructor(private _md5: Md5) {
    let str = "";
    this.str = str;
    let hash = Md5.hashStr(str);
    this.hash = hash;
    let hex = this.hash.match(/.{1,2}(?=(.{2})+(?!.))|.{1,2}$/g).map((e: string) => parseInt(e, 16));
    this.hex = hex;
  }
  
  @ViewChild("myCanvas") canvas: ElementRef;
  @ViewChild("screen") screen: ElementRef;
  @ViewChild("downloadLink") downloadLink: ElementRef;

  ngOnInit() {
    this.drawIdenticon(this.hex);
  }

  onUpdate(str: string) {
    this.str = str;
    this.hash = Md5.hashStr(str);
    this.hex = this.hash.match(/.{1,2}(?=(.{2})+(?!.))|.{1,2}$/g).map((e: string) => parseInt(e, 16));
    console.log(this.hex)
    this.drawIdenticon(this.hex);
  }

  drawIdenticon(matrix: number[]) {
    let ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    let rgb = [this.hex[0], this.hex[1], this.hex[2]];
    let rgb2 = [this.hex[13], this.hex[14], this.hex[15]];

    for (let i=0; i<matrix.length-1; i++) {
      let row = Math.floor(i/3);
      let column = i%3;
      let xx = (i%3)*50;
      let yy = row*50;

      if (matrix[i]%2 == 0) {
        ctx.fillStyle = "rgb(" + rgb + ")";
        ctx.fillRect(xx, yy, 50, 50);
      } else {
        ctx.fillStyle = "rgb(" + rgb2 + ")";
        ctx.fillRect(xx, yy, 50, 50);
      }

      // mirror 1st to 5th and 2nd to 4th column
      if (column == 0) {
        ctx.fillRect(xx + 200, yy, 50, 50);
      } else if (column == 1) {
        ctx.fillRect(xx + 100, yy, 50, 50);
      }
    }
  }

  download(element: any){
    let myCanvas = <HTMLCanvasElement> document.getElementById("canvas");
    element.href = myCanvas.toDataURL("image/png");
  }
}
