export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  summary: string;
  skill: 'write-like-a-human' | 'tune-my-skill';
  image?: string;
  imageAlt?: string;
  markdown?: string;
  blocks?: { text?: string; before?: string; after?: string }[];
};

import tuningArticle from './tune-my-skill-article.md?raw';

export const posts: BlogPost[] = [
  {
    slug: 'tune-my-skill',
    title: 'How to Write Better AI Skills',
    date: '2026-09-19',
    displayDate: 'September 19, 2026',
    summary: 'I wrote “Fine Tune Your Skills” to help AI learn your taste and test whether it’s getting it right.',
    skill: 'tune-my-skill',
    image: '/fine-tune-my-skill.png',
    imageAlt: 'A sketchbook illustration shows examples entering a testing machine with a pink heart and an improved SKILL.md emerging beside a note reading better AI.',
    markdown: tuningArticle.replace(/^## .*\n+/, ''),
  },
  {
    "slug": "write-like-a-human",
    "skill": "write-like-a-human",
    "title": "How I get my AI to write like a human",
    "date": "2026-09-07",
    "displayDate": "September 7, 2026",
    "summary": "I wanted my AI to explain itself clearly. Getting there involved a goldfish and a few very specific writing instructions.",
    "blocks": [
      {
        "text": "As a programmer, I work with AI all day. Sometimes I read a response twice and still think, ‘Okay, but what did you actually do?’ I’m building systems to make working with my AI agents easier, starting with how they write to me."
      },
      {
        "text": "My first attempt was to ask it to explain things like I was five. In a sample login explanation, it wrote, “Your app had a memory like a goldfish,” then described a browser throwing away a little note. Apparently, I was quite convincing about being five."
      },
      {
        "text": "We tried again. The writing got shorter, but the sentences started falling apart. At one point I typed, “4 words is not a setnence.” Apparently, I had strong opinions about prose and no time to check my own spelling. Here’s a small example from those revisions:"
      },
      {
        "before": "Tested on my machine. Not on the live site.",
        "after": "I tested this on my own computer by signing in and reloading several times, but I have not tried it on the live site yet."
      },
      {
        "text": "While we were working on clearer writing, it sent me an update about “subject-verb distance, misplaced modifiers, parallel lists, verbs missing an object, unwinding noun phrases.” Even the explanation of how it was making things simpler needed translating."
      },
      {
        "text": "When I told it I still didn’t understand the grammar terms, it changed its approach. It finally showed me what it meant: “the list was sent,” not “the list were sent.” Seeing the original sentence beside the correction made the explanation easier to follow. My reply was “okay this is awesome!”"
      },
      {
        "text": "I kept the useful corrections and turned them into a reusable skill called Write like a human. It gives my assistant instructions I can keep refining, so I don’t have to explain my preferences from scratch each time."
      },
      {
        "text": "I’m trying to build systems that let me have a great day, go for walks, and still build awesome technology. I’d like to spend more time doing that and less time discussing goldfish."
      },
      {
        "text": "The full skill is below. I’m not a writer, but this sounds better to me! Please try it, revise it, and send me what you changed. I’d love to see your version."
      }
    ]
  }
];
