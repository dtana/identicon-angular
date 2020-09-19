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
  public hex: number[];
  public binary: number[];

  @ViewChild("identicon") canvas: ElementRef;
  @ViewChild("downloadLink") downloadLink: ElementRef;

  ngOnInit() {
    this.onUpdate("");
  }

  onUpdate(str: string) {
    this.str = str;
    this.hash = Md5.hashStr(str);
    this.hex = this.hash.match(/.{1,2}/g).map((e: string) => parseInt(e, 16));
    this.drawIdenticon();
  }

  altBgColor(num: number) {
    return Math.floor((255 - num)/2) + (num < 128 && 128);
  }

  drawIdenticon() {
    const boxSize = 50;
    this.binary = this.hex.map(e => e % 2 === 0 ? 1 : 0);

    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    const drawColor = [this.hex[0], this.hex[1], this.hex[2]];
    const bgColor = drawColor.map(el => this.altBgColor(el));

    ctx.fillStyle = `rgb(${drawColor})`;
    ctx.fillRect(0, 0, 250, 250);

    for (let i=0; i<this.binary.length; i++) {
      const row: number = Math.floor(i / 3);
      const column: number = i % 3;

      ctx.fillStyle = `rgb(${bgColor})`;

      // fill boxes only for even numbers
      if (this.binary[i] % 2 === 0) {
        const x = column * boxSize;
        const y = row * boxSize;
        const mirror = 4 - column;

        ctx.fillRect(x, y, boxSize, boxSize);
        // mirror first two pixels in a row
        mirror > 2 && ctx.fillRect(mirror * boxSize, y, boxSize, boxSize);
      }
    }
  }

  download(){
    this.downloadLink.nativeElement.href = this.canvas.nativeElement.toDataURL("image/png");
  }
}
