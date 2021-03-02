import { Component, ViewChild, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';
import * as d3 from 'd3v4';

@Component({

  selector: 'iHeatmap',
  // moduleId: __moduleName,
  templateUrl: 'heatmap.component.html',
  styleUrls: ['heatmap.component.css'],
  providers: [DataService]
})
export class HeatmapComponent {

  // public __moduleName: string;
  public element: any;
  @ViewChild('chart3', { static: false }) private chartContainer: ElementRef;
  @Input() requestType: any;
  @Input() chartWidth: any;
  @Input() chartHeight: any;
  @Input() changeTrigger: any;
  // @Input() helpScreen: any=0;  
  private chart: any;

  constructor(private dataService: DataService) {
    console.log("******** called:****************");
  }

  ngOnInit() {
    //REST call
    console.log("*********--------- In Heatmap");
    /*this.dataService.getListItems(this.requestType).subscribe((listItems: any[]) => {
        //let data = listItems;
    });*/
    if (typeof this.element != "object") {
      this.element = this.chartContainer.nativeElement;
    }
    else {
      this.element.removeChild(this.element.lastChild);
    }
    this.createChart();
  }

  createChart() {

    let margin = { top: 50, right: 0, bottom: 100, left: 100 };
    let width = 930 - margin.left - margin.right;
    let height = 530 - margin.top - margin.bottom;
    let gridSize = Math.floor(width / 24);
    let legendElementWidth = gridSize * 2;
    let buckets = 6;
    //Amber #FFC200; Red ; Green
    let colors = ["rgba(64, 76, 87, 0.99)", "rgba(86, 78, 103, 0.99)", "rgba(129, 98, 137, 0.99)", "rgba(170, 119, 170, 0.99)", "rgba(212, 140, 203, 0.99)", "#FEA1EB"];
    // alternatively colorbrewer.YlGnBu[9]
    //let colors = ["0ABF00", "9ABF00", "BFB200", "BF7D00", "BF4E00", "BF0004"];

    let actor = ['CORE', 'INVT', 'LQDT', 'MGMT', 'DSHA', 'MIRR', 'XYZ'];
    let eps3 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];

    /*d3.csv("/PFA/app/widgets/compliance/data/season3.csv",
        function(d) {
            // var strings = d3.tsv.parse(string);
            return {
                episodes: +d.episodes,
                actors: +d.actors,
                value: +d.value,
                movie: d.movie,
                tv: d.tv,
                people: d.people
            };
        },*/
    let data = [
      {
        "episodes": 1,
        "actors": 1,
        "value": 6,
        "movie": "Operation Dumbo Drop (1995), Run Lola Run (1998), The Cell (2000), 2001: A Space Odyssey (1968) ",
        "tv": " ",
        "people": " "
      },
      {
        "episodes": 1,
        "actors": 2,
        "value": 2,
        "movie": "",
        "tv": "Cougar Town (2009), Dr. Who (1963)",
        "people": ""
      },
      {
        "episodes": 1,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 1,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 1,
        "actors": 5,
        "value": 2,
        "movie": "The Remains of the Day (1993) ",
        "tv": "",
        "people": "Batman"
      },
      {
        "episodes": 1,
        "actors": 6,
        "value": 1,
        "movie": "Green mile (1999) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 1,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 2,
        "actors": 1,
        "value": 1,
        "movie": "Spartacus (1960) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 2,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 2,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 2,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 2,
        "actors": 5,
        "value": 1,
        "movie": "Ace Ventura: When Nature Calls (1995) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 2,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 2,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 3,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 3,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 3,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 3,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 3,
        "actors": 5,
        "value": 4,
        "movie": "48 Hrs. (1982) ",
        "tv": "Breaking Bad (2008)",
        "people": " Nick Nolte,  Eddie Murphy"
      },
      {
        "episodes": 3,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 3,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 4,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 4,
        "actors": 2,
        "value": 2,
        "movie": "Raiders of the Lost Ark (1981)",
        "tv": "Star Trek (1966) ",
        "people": ""
      },
      {
        "episodes": 4,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 4,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 4,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 4,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 4,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 5,
        "actors": 1,
        "value": 1,
        "movie": "The Fast and the Furious (2001)",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 5,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 5,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 5,
        "actors": 4,
        "value": 1,
        "movie": "Beetlejuice (1988) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 5,
        "actors": 5,
        "value": 2,
        "movie": "Maniac Cop (1988), The Human Centipede (First Sequence) (2009) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 5,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 5,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 6,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 6,
        "actors": 2,
        "value": 2,
        "movie": "Tron (1982) ",
        "tv": "Dr. Who (1963)",
        "people": ""
      },
      {
        "episodes": 6,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 6,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 6,
        "actors": 5,
        "value": 3,
        "movie": "Star Wars (1977)",
        "tv": "Dr. Who (1963)",
        "people": " Harrison Ford"
      },
      {
        "episodes": 6,
        "actors": 6,
        "value": 1,
        "movie": "",
        "tv": "",
        "people": "Bruce Vilanch"
      },
      {
        "episodes": 6,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 7,
        "actors": 1,
        "value": 2,
        "movie": "Batman Forever (1995)",
        "tv": "Salvage 1 (1979)",
        "people": ""
      },
      {
        "episodes": 7,
        "actors": 2,
        "value": 3,
        "movie": "Star Wars: Episode V - The Empire Strikes Back (1980), Star Wars: Episode I - The Phantom Menace (1999) ",
        "tv": "Star Trek: The Next Generation (1987) ",
        "people": ""
      },
      {
        "episodes": 7,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 7,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 7,
        "actors": 5,
        "value": 3,
        "movie": "Star Wars: Episode V - The Empire Strikes Back (1980), Star Wars: Episode I - The Phantom Menace (1999) ",
        "tv": "Star Trek: The Next Generation (1987) ",
        "people": ""
      },
      {
        "episodes": 7,
        "actors": 6,
        "value": 1,
        "movie": "",
        "tv": "Friends (1994) ",
        "people": ""
      },
      {
        "episodes": 7,
        "actors": 7,
        "value": 1,
        "movie": "",
        "tv": "The Jeffersons (1975) ",
        "people": ""
      },
      {
        "episodes": 8,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 8,
        "actors": 2,
        "value": 2,
        "movie": "Apocalypse Now (1979), Hearts of Darkness: A Filmmaker's Apocalypse (1991) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 8,
        "actors": 3,
        "value": 1,
        "movie": "Air Bud (1997) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 8,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 8,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 8,
        "actors": 6,
        "value": 1,
        "movie": "",
        "tv": "Forensic Files (1999)",
        "people": ""
      },
      {
        "episodes": 8,
        "actors": 7,
        "value": 1,
        "movie": "",
        "tv": "Fantasy Island (1977)",
        "people": ""
      },
      {
        "episodes": 9,
        "actors": 1,
        "value": 1,
        "movie": "Das Boot (1981)",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 9,
        "actors": 2,
        "value": 1,
        "movie": "The Dark Knight (2008)",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 9,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 9,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 9,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 9,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 9,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 10,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 10,
        "actors": 2,
        "value": 4,
        "movie": "Gremlins (1984) ",
        "tv": "Twin Peaks (1990), The Star Wars Holiday Special (1978)",
        "people": "Steven Spielberg"
      },
      {
        "episodes": 10,
        "actors": 3,
        "value": 1,
        "movie": "Invasion of the Body Snatchers (1978) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 10,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 10,
        "actors": 5,
        "value": 3,
        "movie": "Gremlins (1984) ",
        "tv": "Twin Peaks (1990)",
        "people": "Steven Spielberg"
      },
      {
        "episodes": 10,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 10,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 11,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 11,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 11,
        "actors": 3,
        "value": 2,
        "movie": "The Stepford Wives (1975) ",
        "tv": "",
        "people": " Martha Stewart"
      },
      {
        "episodes": 11,
        "actors": 4,
        "value": 1,
        "movie": "",
        "tv": "",
        "people": "Jim Belushi"
      },
      {
        "episodes": 11,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 11,
        "actors": 6,
        "value": 3,
        "movie": "Jack and Jill (2011) ",
        "tv": "",
        "people": " Halle Berry,  Adam Sandler"
      },
      {
        "episodes": 11,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 12,
        "actors": 1,
        "value": 3,
        "movie": "Cast Away (2000) ",
        "tv": "The Incredible Hulk (1978)",
        "people": "Danny Thomas"
      },
      {
        "episodes": 12,
        "actors": 2,
        "value": 3,
        "movie": "Popeye (1980), The Fugitive (1993), Patch Adams (1998) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 12,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 12,
        "actors": 4,
        "value": 1,
        "movie": "The Wizard of Oz (1939) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 12,
        "actors": 5,
        "value": 4,
        "movie": "Blade Runner (1982), Risky Business (1983), Lorenzo (1992), Precious (2009) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 12,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 12,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 13,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 13,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 13,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 13,
        "actors": 4,
        "value": 1,
        "movie": "",
        "tv": "",
        "people": "Jane Austen "
      },
      {
        "episodes": 13,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 13,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 13,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 14,
        "actors": 1,
        "value": 2,
        "movie": "Ferris Bueller's Day Off (1986) ",
        "tv": "The Cape (2011)",
        "people": ""
      },
      {
        "episodes": 14,
        "actors": 2,
        "value": 5,
        "movie": "First Blood (1982), Rambo: First Blood Part II (1985), Rambo III (1988), That's Entertainment! (1974), RoboCop (1987) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 14,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 14,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 14,
        "actors": 5,
        "value": 1,
        "movie": "That's Entertainment! (1974) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 14,
        "actors": 6,
        "value": 1,
        "movie": "",
        "tv": "Forensic Files (1999) ",
        "people": ""
      },
      {
        "episodes": 14,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 15,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 15,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 15,
        "actors": 3,
        "value": 1,
        "movie": "Wolf (1994) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 15,
        "actors": 4,
        "value": 2,
        "movie": "When Harry Met Sally... (1989), Charlie St. Cloud (2010)\n",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 15,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 15,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 15,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 16,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 16,
        "actors": 2,
        "value": 1,
        "movie": "",
        "tv": "",
        "people": "Clive Owen"
      },
      {
        "episodes": 16,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 16,
        "actors": 4,
        "value": 5,
        "movie": "2001: A Space Odyssey (1968), Zardoz (1974), Star Wars (1977)",
        "tv": "Extreme Makeover (2002), Cougar Town (2009)",
        "people": ""
      },
      {
        "episodes": 16,
        "actors": 5,
        "value": 2,
        "movie": "About a Boy (2002), Inception (2010) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 16,
        "actors": 6,
        "value": 1,
        "movie": "The Matrix (1999) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 16,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 17,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 17,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 17,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 17,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 17,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 17,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 17,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 18,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 18,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 18,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 18,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 18,
        "actors": 5,
        "value": 1,
        "movie": "Aladdin (1992)",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 18,
        "actors": 6,
        "value": 1,
        "movie": "",
        "tv": "",
        "people": " Tim Russert"
      },
      {
        "episodes": 18,
        "actors": 7,
        "value": 1,
        "movie": "Animal House (1978) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 19,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 19,
        "actors": 2,
        "value": 1,
        "movie": "",
        "tv": "Mad Men (2007)",
        "people": ""
      },
      {
        "episodes": 19,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 19,
        "actors": 4,
        "value": 1,
        "movie": "",
        "tv": "",
        "people": " Harrison Ford"
      },
      {
        "episodes": 19,
        "actors": 5,
        "value": 2,
        "movie": "",
        "tv": "Mork & Mindy (1978)",
        "people": " Robin Williams"
      },
      {
        "episodes": 19,
        "actors": 6,
        "value": 5,
        "movie": "Star Trek (1966), Star Wars (1977), Tower Heist (2011)",
        "tv": "",
        "people": "Brett Ratner, Spielberg"
      },
      {
        "episodes": 19,
        "actors": 7,
        "value": 1,
        "movie": "",
        "tv": "",
        "people": "Eartha Kitts"
      },
      {
        "episodes": 20,
        "actors": 1,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 20,
        "actors": 2,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 20,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 20,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 20,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 20,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 20,
        "actors": 7,
        "value": 3,
        "movie": "Rain Man (1988), Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb (1964)",
        "tv": "",
        "people": " LeVar Burton"
      },
      {
        "episodes": 21,
        "actors": 1,
        "value": 1,
        "movie": "",
        "tv": "Criss Angel Mindfreak (2005)",
        "people": ""
      },
      {
        "episodes": 21,
        "actors": 2,
        "value": 1,
        "movie": "The Poseidon Adventure (1972) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 21,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 21,
        "actors": 4,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 21,
        "actors": 5,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 21,
        "actors": 6,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 21,
        "actors": 7,
        "value": 1,
        "movie": "Ocean's Eleven (2001)",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 22,
        "actors": 1,
        "value": 2,
        "movie": "Butch Cassidy and the Sundance Kid (1969)",
        "tv": "Sabrina, the Teenage Witch (1996)",
        "people": ""
      },
      {
        "episodes": 22,
        "actors": 2,
        "value": 4,
        "movie": "Back to the Future Part III (1990), RoboCop 2 (1990), The Chronicles of Riddick (2004)",
        "tv": "Star Trek: Mirror, Mirror (1967)",
        "people": ""
      },
      {
        "episodes": 22,
        "actors": 3,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 22,
        "actors": 4,
        "value": 1,
        "movie": "",
        "tv": "Dance Moms (2011) ",
        "people": ""
      },
      {
        "episodes": 22,
        "actors": 5,
        "value": 1,
        "movie": "The Skulls (2000) ",
        "tv": "",
        "people": ""
      },
      {
        "episodes": 22,
        "actors": 6,
        "value": 1,
        "movie": "",
        "tv": "L.A. Law (1986)",
        "people": "\"\""
      },
      {
        "episodes": 22,
        "actors": 7,
        "value": 0,
        "movie": "",
        "tv": "",
        "people": ""
      }
    ];




    //function(error, data) {
    let colorScale = d3.scale.quantile()
      .domain([-1, buckets - 1, 10])
      .range(colors);

    let svg = d3.select(this.element).append("svg")
      .attr("width", 950)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let dayLabels = svg.selectAll(".dayLabel")
      .data(actor)
      .enter().append("text")
      .text(function (d) { return d; })
      .style("fill", "#fff")
      .attr("x", 0)
      .attr("y", function (d, i) { return i * gridSize; })
      .style("text-anchor", "end")
      .attr("transform", "translate(-10," + gridSize / 1.5 + ")")
      .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

    let timeLabels = svg.selectAll(".timeLabel")
      .data(eps3)
      .enter().append("text")
      .style("fill", "#fff")
      .text(function (d) { return d; })
      .attr("x", function (d, i) { return i * gridSize; })
      .attr("y", 0)
      .style("text-anchor", "middle")
      .attr("transform", "translate(" + gridSize / 2 + ", -10)")
      .attr("class", function (d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });

    console.log(data);

    let heatMap = svg.selectAll(".hour")
      .data(data)
      .enter().append("rect")
      .attr("x", function (d) { return (d.episodes - 1) * gridSize; })
      .attr("y", function (d) { return (d.actors - 1) * gridSize; })

      .attr("class", "hour bordered")
      .attr("width", gridSize)
      .attr("height", gridSize)
      .style("fill", colors[0])
      /*
                          .on("mouseover", function(d) {                        
                              //let pageX = event.pageX;
                              //  let pageY =event.pageY;
                            
                              //highlight text
                              d3.select(this).classed("cell-hover", true);
                              d3.selectAll(".timeLabel").classed("text-highlight", function(r, ri) { return ri == (d.episodes - 1); });
                              d3.selectAll(".dayLabel").classed("text-highlight", function(c, ci) { return ci == (d.actors - 1); });
      
                              //Update the tooltip position and value
                              d3.select("#tooltip")
                                  .style("left", (event.pageX + 10) + "px")
                                  .style("top", (event.pageY - 10) + "px")
                                  .select("#value");
                          
                      //Show the tooltip
      
                      if (d.movie.length == 0 && d.tv.length == 0 && d.people.length == 0) {
                          d3.select("#tooltip").classed("hidden", true);
                      }
                      else {
      
                          if (d.movie.length != 0 && d.tv.length == 0 && d.people.length == 0) {
                              d3.select("#tooltip").classed("hidden", false)
      
                                  .html("<strong>movie:</strong> <span style='color:#2ECC71'>" + d.movie + "</span>");
                          }
      
                          else if (d.movie.length == 0 && d.tv.length != 0 && d.people.length == 0) {
                              d3.select("#tooltip").classed("hidden", false)
                                  .html("<strong>tv: </strong> <span style='color:#3498DB'>" + d.tv + "</span>");
                          }
      
                          else if (d.movie.length == 0 && d.tv.length == 0 && d.people.length != 0) {
                              d3.select("#tooltip").classed("hidden", false)
      
                                  .html("<strong>people: </strong> <span style='color:#F1C40F'>" + d.people + "</span>");
      
                          }
      
                          else if (d.movie.length != 0 && d.tv.length != 0 && d.people.length == 0) {
                              d3.select("#tooltip").classed("hidden", false)
      
                                  .html("<strong>tv: </strong> <span style='color:#2ECC71'>" + d.tv + "</span>  <br> <strong> movie: </strong> <span style='color:#F1C40F'>" + d.movie + "</span>");
                          }
      
                          else if (d.movie.length != 0 && d.tv.length == 0 && d.people.length != 0) {
                              d3.select("#tooltip").classed("hidden", false)
                                  .html("<strong>movie:</strong> <span style='color:#2ECC71'>" + d.movie + "</span> <br> <strong>people: </strong> <span style='color:#F1C40F'>" + d.people + "</span>");
                          }
      
                          else if (d.movie.length == 0 && d.tv.length != 0 && d.people.length != 0) {
                              d3.select("#tooltip").classed("hidden", false)
                                  .html("<strong>tv: </strong> <span style='color:#3498DB'>" + d.tv + "</span> <br> <strong>people: </strong> <span style='color:#F1C40F'>" + d.people + "</span>");
                          }
      
                          else {
                              d3.select("#tooltip").classed("hidden", false)
                                  .html("<strong>movie:</strong> <span style='color:#2ECC71'>" + d.movie + "</span> <br> <strong>tv: </strong> <span style='color:#3498DB'>" + d.tv + "</span> <br> <strong>people: </strong> <span style='color:#F1C40F'>" + d.people + "</span>");
      
                          }
      
                      }
      
                  })*/
      //onmouseover 

      .on("mouseout", function () {
        d3.select(this).classed("cell-hover", false);
        d3.selectAll(".timeLabel").classed("text-highlight", false);
        d3.selectAll(".dayLabel").classed("text-highlight", false);
        d3.select("#tooltip").classed("hidden", true);
      });

    heatMap.transition().duration(1000)
      .style("fill", function (d) { return colorScale(d.value); });

    //heatMap.append("title").text(function(d) { return d.value; });

    let legend = svg.selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), function (d) { return d; })
      .enter().append("g")
      .attr("class", "legend");

    legend.append("rect")
      .attr("x", function (d, i) { return legendElementWidth * i; })
      .attr("y", height)
      .attr("width", legendElementWidth)
      .attr("height", gridSize / 2)
      .style("fill", function (d, i) { return colors[i]; });

    legend.append("text")
      .attr("class", "mono")
      .text(function (d) { if (Math.round(d) != 0) { return "≥ " + Math.round(d); } else { return "= " + Math.round(d); } })
      .style("fill", "#fff")
      .attr("x", function (d, i) { return legendElementWidth * i; })
      .attr("y", height + gridSize);

    legend.append("text")
      .text("")//.text("Season 3")
      .attr("x", 750)
      .attr("y", height + 10);

    //});
  }
  /*  helpOut(){
        this.helpScreen =0;
        console.log("***helpscreen heatmap:",this.helpScreen);
    }*/
}


