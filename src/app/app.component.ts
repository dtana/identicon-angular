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
  public matrix: number[];
  public evenodd: number[];
  public binary: any[];
  // public temp: number[];
  
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
    this.matrix = matrix;
    this.evenodd = matrix.map(e => e%2==0 ? 1 : 0);
    // this.binary = binary;

    for (let i=0; i<this.evenodd.length-1; i++) {
      let temp = new Array();
      for (let j=0; j<3; j++) {
        temp.push(this.evenodd[j+i]);
      }
      
      temp[temp.length] = temp[1];
      temp[temp.length] = temp[0];
      this.binary[this.binary.length] = temp;
    }

    console.log(this.binary)


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

  // canvas init
  // let canvas = document.getElementById("canvas");
  // let ctx = canvas.getContext("2d");
  // canvas.width = 250;
  // canvas.height = 250;
  // canvas.style.backgroundColor = "rgb(100, 200, 0)";
  
  
  // 145,46,200,3,178,206,73,228,165,65,6,141,73,90,181,112
  // ----
  // 1,0,0,1,0,0,1,0,1,1,0,1,1,0,1,0 - after isEven
  // ----
  // 1,0,0,0,1 - row 1
  // 1,0,0,0,1 - row 2
  // 1,0,1,0,1 - row 3
  // 1,0,1,0,1 - row 4
  // 1,0,1,0,1 - row 5
  // ----
  // 0,3,6,8,9,11,12,14

  // buildGrid() {
  //   let ctx: CanvasRenderingContext2D =
  //   this.canvasRef.nativeElement.getContext("2d");
  //   let rgb = [this.hex[0], this.hex[1], this.hex[2]];

  //   this.canvasRef.width = 250;
  //   this.canvasRef.height = 250;
  //   this.canvasRef.fillStyle = "rgb(100, 200, 0)";
  //   let array = this.hex;
  //   for (let i=0; i<array.length-1; i++) {
  //     let row = Math.floor(i/3);
  //     let column = i%3;

  //     if (array[i]%2 == 0) {
  //       let xx = (i % 3)*50;
  //       let yy = row*50;

  //       ctx.fillStyle = "rgb(" + rgb2 + ")";
  //       ctx.fillRect(xx, yy, 50, 50);

  //       // mirror 1st to 5th and 2nd to 4th column
  //       if (column == 0) {
  //         ctx.fillRect(xx + 200, yy, 50, 50);
  //       } else if (column == 1) {
  //         ctx.fillRect(xx + 100, yy, 50, 50);
  //       }
  //     }
  //   }
  // };


}
