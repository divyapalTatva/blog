import { JsonPipe } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogCardService implements OnInit {
  cardData: any = [
    {
      id: 1,
      title: 'His mother had always taught him',
      description:
        "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
      imgSource: '../../../../assets/hi-estudio-rZAHQugCnGA-unsplash.jpg',
      tags: ['history', 'american', 'crime'],
    },
    {
      id: 2,
      title: 'He was an expert but not in a discipline',
      description:
        'He was an expert but not in a discipline that anyone could fully appreciate. He knew how to hold the cone just right so that the soft server ice-cream fell into it at the precise angle to form a perfect cone each and every time. It had taken years to perfect and he could now do it without even putting any thought behind it.',
      imgSource:
        '../../../../assets/susan-g-komen-3-day-icahJs5jFXs-unsplash.jpg',
      tags: ['french', 'fiction', 'english'],
    },
    {
      id: 3,
      title: 'Dave watched as the forest burned up on the hill.',
      description:
        "Dave watched as the forest burned up on the hill, only a few miles from her house. The car had been hastily packed and Marta was inside trying to round up the last of the pets. Dave went through his mental list of the most important papers and documents that they couldn't leave behind. He scolded himself for not having prepared these better in advance and hoped that he had remembered everything that was needed. He continued to wait for Marta to appear with the pets, but she still was nowhere to be seen.",
      imgSource: '../../../../assets/hi-estudio-rZAHQugCnGA-unsplash.jpg',
      tags: ['magical', 'history', 'french'],
    },
    {
      id: 4,
      title: 'All he wanted was a candy bar.',
      description:
        "All he wanted was a candy bar. It didn't seem like a difficult request to comprehend, but the clerk remained frozen and didn't seem to want to honor the request. It might have had something to do with the gun pointed at his face.",
      imgSource:
        '../../../../assets/susan-g-komen-3-day-icahJs5jFXs-unsplash.jpg',
      tags: ['mystery', 'english', 'american'],
    },
    {
      id: 5,
      title: 'Hopes and dreams were dashed that day.',
      description:
        "Hopes and dreams were dashed that day. It should have been expected, but it still came as a shock. The warning signs had been ignored in favor of the possibility, however remote, that it could actually happen. That possibility had grown from hope to an undeniable belief it must be destiny. That was until it wasn't and the hopes and dreams came crashing down.",
      imgSource: '../../../../assets/mike-hindle-Gxvp8X39Ylw-unsplash (1).jpg',
      tags: ['crime', 'mystery', 'love'],
    },
    {
      id: 6,
      title: "Dave wasn't exactly sure how he had ended up",
      description:
        "Dave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment. The first was how to get out of his current situation of being naked in a tree with snow falling all around and no way for him to get down.",
      imgSource: '../../../../assets/hi-estudio-rZAHQugCnGA-unsplash.jpg',
      tags: ['english', 'classic', 'american'],
    },
    {
      id: 7,
      title: 'This is important to remember.',
      description:
        "This is important to remember. Love isn't like pie. You don't need to divide it among all your friends and loved ones. No matter how much love you give, you can always give more. It doesn't run out, so don't try to hold back giving it as if it may one day run out. Give it freely and as much as you want.",
      imgSource: '../../../../assets/mike-hindle-Gxvp8X39Ylw-unsplash (1).jpg',
      tags: ['magical', 'crime'],
    },
    {
      id: 8,
      title: 'One can cook on and with an open fire.',
      description:
        "One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order to keep meat from burning, it's best to slowly rotate it.",
      imgSource: '../../../../assets/martin-martz-W0EaIFjAck4-unsplash.jpg',
      tags: ['american', 'english'],
    },
  ];

  constructor() {}
  //set card data to local storage
  ngOnInit(): void {
    let cardData = JSON.stringify(this.cardData);
    localStorage.setItem('Blogs', cardData);
  }

  //get card data from local storage
  getCardData(): any {
    const Data = localStorage.getItem('Blogs');
    return JSON.parse(Data!);
  }
}
