# Reverso (FR-EN) to Anki Scraper
Generate Anki-friendly txt files from Reverso Context website (FR-EN) via command line. You choose the amount of example sentences. Automate your studying routine.

# About
Write a target phrase / construction. Example sentences will be scraped from Reverso Context. Automatically save (or not) them in a Anky-import-friendly txt file. Import the file in Anki. Deepen your understanding of French contextual subtleties. 

# Usage 

1) Download the files. As the program depends on several npm packages, you will need to download them.
In the directory where you downloaded the files:
```
npm --save-dev install
```

2) You are ready to rock! Run the program:
```
node reverso-to-anki.js
```

3) Enter the construction / phrase of interest in French. Not English, French. Hence FR-EN in the title.
```
Enter your construction/phrase: non pas que  
```

4) Enter the amount of examples you would like to save:
```
How many entries (max input 14; 13 will be added) from Reverso would you like to have? 10
```
**Important:** Amount of Saved Examples = Your Input - 1

*If you input 7, then 6 entries will be saved not 7 due to the html structure of the website.*

5) The program will ask you if you want to save the results in a txt file or not. It's important if you just want to have a look at the example sentences.
```
Do you want to save the results in a .txt file? (yes/no) yes
```

6) The program will do its JavaScript magic and the example sentences will be displayed:
```
Status code: 200. Success!
Your input is: non pas que
--------------

J'ai de la peine, [non pas que] je doute que nous ne puissions continuer.

I grieve, [not because] I'm afraid that we won't be able to continue.

------------
etc etc etc
```

7) Now you will have a new txt file (AddIntoAnki.txt) created in the program directory, which can be easily imported (fields are separated by "|") into a beautiful spaced repetition software by the name of Anki.

**Important**: Initially you have no txt file in the program directory. It will be created after the first run. New example sentences will be appended to the AddIntoAnki.txt file as you use look for other constructions/phrases. When you have enough entries, import the txt file into Anki. Afterwards either delete the txt file or delete everything in the txt file so that new example sentences can be added not on top of the already added entries.