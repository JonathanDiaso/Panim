// PANIM_VERSE_NOTES — the apparatus under each quotation.
//
// THE SHAPE WAS APPROVED IN ROUND TWO, option A: two labelled lines under the
// verse — WHERE YOU ARE, one or two sentences of situation, and WORTH KNOWING,
// one fact the reader would not otherwise have. Written in the author's own
// voice and QUOTING NO TRANSLATION, which is not a stylistic preference: the
// book quotes NASB, which is copyrighted, and a bundled context passage would
// have to come from a public-domain text and would visibly disagree with the
// quotation printed directly above it. Notes in your own words sidestep that
// entirely.
//
// 🛑 KEYED BY CHAPTER AND CITATION, NOT BY BLOCK ID. Block ids (ch02-v7) are
// assigned in manuscript order by tools/build-chapters.py and MOVE whenever a
// paragraph is added or cut — that is the same reason cues must be rebuilt after
// the chapters are. A citation does not move. The chapter is part of the key
// because two chapters can quote the same verse and mean different things by it:
// Numbers 6:24–26 opens chapter I and closes chapter X, and the note is not the
// same note.
//
// A verse with no entry here renders no note, on purpose. Some quotations in the
// book are the book echoing something it has already cited, and an apparatus line
// under those would undo the echo.
//
// THE REGISTER, so a later hand can match it:
//   · "Where you are" is situational and present-tense. Who is speaking, to whom,
//     at what moment. It never interprets.
//   · "Worth knowing" is ONE fact, and it has to be a fact — a philological
//     detail, a structural one, a manuscript or archaeological one, or a
//     cross-reference the reader could not have made. It is not a second opinion
//     and it is never a homily.
//   · No exclamation marks, no rhetorical questions, no second person imperative.
//   · If there is nothing worth knowing, there is no note.
window.PANIM_VERSE_NOTES = {
  // ---- Chapter I ----
  ch01: {
    "Numbers 6:24–26": {
      where: "Aaron and his sons are given the exact words they are to say over Israel — not a prayer they compose, a text they are handed. Priests have spoken it over bowed heads every day since.",
      worth: "This is the passage on the silver scrolls from Ketef Hinnom, and that makes it the oldest biblical text ever found — roughly four centuries older than the earliest Dead Sea Scroll. The oldest surviving words of Scripture are a blessing about a face."
    },
    "Genesis 16:13": {
      where: "Hagar is a pregnant Egyptian slave who has run into the desert to get away from the woman who owns her. She is alone, and God finds her there.",
      worth: "In the whole Bible, this is the only time a human being gives God a name. Not a prophet, not a patriarch — a runaway foreign slave girl, and the name she gives Him is <em>El Ro’i</em>, the God who sees me."
    },
    "Matthew 5:8": {
      where: "Early in the Sermon on the Mount, in a list of blessings, spoken to an ordinary crowd on a hillside.",
      worth: "Every other beatitude promises something you can picture — comfort, land, mercy. This one promises the thing Moses asked for and was refused. It is said flatly, to a crowd, with no explanation, and nothing in the surrounding chapters comes back to it."
    }
  },
  // ---- Chapter II ----
  ch02: {
    "Genesis 3:8": {
      where: "The first thing the man and the woman do after eating is not argue and not explain. They hear Him coming and they go into the trees.",
      worth: "The phrase behind <em>the cool of the day</em> is literally <em>at the wind of the day</em> — the hour when the air begins to move. Scripture’s first record of shame is dated by the weather."
    },
    "Genesis 4:5": {
      where: "God accepts Abel’s offering and not Cain’s. Before a word is said about murder, Genesis tells you what happened to Cain’s face.",
      worth: "<em>His face fell</em> is Hebrew idiom carried into English intact — <em>vayiplu panav</em>, and the noun is plural, his faces. It is the first time the book puts <em>panim</em> on a human being in trouble, and the phrase is still in use four thousand years later."
    },
    "Genesis 4:14": {
      where: "Cain is being sent east of Eden, and this is him answering the sentence — counting up what he is about to lose.",
      worth: "He names four losses and puts the face last. The verb is <em>satar</em>: hiddenness on purpose, a face deliberately turned away. The first murderer in Scripture describes his own punishment in the vocabulary this book is following, before there is a law or a priest to explain it to him."
    },
    "Jonah 1:3": {
      where: "Jonah is told to go east to Nineveh. He walks down to the coast and buys passage to the furthest west port anyone in his world had heard of.",
      worth: "<em>From the presence of the LORD</em> is <em>millifnei</em> — from before His face. Jonah’s stated destination is not a city, it is an absence; and Tarshish is usually placed on the far coast of Spain, which is to say he bought a ticket to the end of the map."
    },
    "Jonah 2:4": {
      where: "Praying from inside the fish, and this is the line where he says what he believes has happened to him.",
      worth: "He says the running worked. Then the same verse turns on one word — <em>nevertheless</em> — and the whole book turns with it. He says it while drowning, and nothing about his situation has changed when he does."
    },
    "Isaiah 59:2": {
      where: "Isaiah is answering a complaint. The people have said God is not listening, and the prophet tells them the problem is not His hearing.",
      worth: "The verse does not say God hid His face. It makes their sins the subject of the verb — the sins did the hiding. That puts the turning-away on the near side of the gap, which is a different claim from the one the complaint was making."
    },
    "Job 13:24": {
      where: "Job is mid-argument, addressing God directly, well past the point of managing his tone.",
      worth: "He asks it as a legal question: the same verb, <em>satar</em>, and then <em>oyev</em>, enemy, which is a courtroom word. Job is not asking why he is sad. He is asking to be told the charge."
    },
    "Job 42:5": {
      where: "The end of the book, after God has spoken out of the storm and said nothing whatever about Job’s suffering.",
      worth: "Job never gets his answer. He gets a face. Every question he asked across thirty-eight chapters is left standing, and the book treats that as a resolution."
    },
    "Psalm 13:1": {
      where: "Four questions in two verses, all of them the same question, and the psalm has still not said what is actually wrong.",
      worth: "<em>How long</em> opens the line four times running — <em>ad-anah</em>, the densest repetition of its kind in the Psalter. A psalm that never names its trouble and never stops counting the days."
    },
    "Psalm 13:6": {
      where: "Six verses later. Same psalm, same psalmist, and nothing in between has been reported as fixed.",
      worth: "The complaint is not withdrawn and no rescue is described. The turn happens anyway. Hebrew laments do this so consistently that the swing has a name in the scholarship — the psalm moves to trust without waiting for the circumstances to move first."
    },
    "Psalm 88:14, 18": {
      where: "Near the end of the darkest psalm in the book, and it is about to finish without turning.",
      worth: "Psalm 88 is the one lament in the Psalter with no turn in it. The last word in the Hebrew is <em>darkness</em>. Whoever assembled the book left it in: a collection made for public worship kept a prayer that does not resolve."
    },
    "Psalm 32:5": {
      where: "David describing what ended a stretch he has just spent four verses calling physical — bones wasting, strength dried up.",
      worth: "Three different Hebrew words for wrongdoing appear in this one verse. The psalm has been circling; here it says all of it at once, and gives the turn no drama at all."
    },
    "Psalm 27:8": {
      where: "In the middle of a psalm about wanting one thing, the psalmist stops and quotes God back to Him.",
      worth: "The Hebrew is famously broken here — the persons do not agree, and translators have been patching the line for centuries. What survives every patch is the shape of it: a command about a face, and a heart answering in the same words."
    },
    "Hosea 5:15–6:3": {
      where: "God announcing a withdrawal, and then, with no break in the text, the people’s answer to it.",
      worth: "The chapter division falls in the middle of this. In the Hebrew there is no gap between the going away and the coming after — the numbering is a much later editor’s, and reading straight across it is closer to what Hosea wrote."
    },
    "Hosea 2:6": {
      where: "God describing what He is about to do to a wife who is going after other lovers, inside the marriage figure the book opens with.",
      worth: "The thorns are not the punishment in Hosea’s sequence. They are a fence. Three verses of blocked road lead to a wilderness and a proposal, which means the obstruction is aimed at the return."
    },
    "Hosea 2:7": {
      where: "The wife, having failed to find the lovers, talking to herself on the road.",
      worth: "Her stated reason for going back is not remorse — she says she was better off before. It is the most unflattering motive available, and the next thing God says is that He will allure her. Hosea sets the shabby reason and the tender answer side by side and leaves them there."
    },
    "Hosea 2:14": {
      where: "Directly after the thorns and the wall, with no transition of any kind.",
      worth: "The verb is <em>patah</em> — the word used elsewhere for seducing, or for talking someone into something. And the place He takes her is the wilderness, which in this book is not exile. It is where the courtship happened the first time."
    }
  },
  // ---- Chapter III ----
  ch03: {
    "Deuteronomy 5:4": {
      where: "Moses, forty years on, telling a new generation what happened at Sinai — and telling them it happened to them.",
      worth: "This is <em>panim be-panim</em>, the phrase in full. Deuteronomy uses it for an event the same speech insists nobody saw: no form, only a voice. Both claims stand four verses apart and neither is withdrawn."
    },
    "Deuteronomy 4:12": {
      where: "Eight verses of warning about images, and this is the reason given for all of them.",
      worth: "The word for form is <em>temunah</em>. The argument is not that images are disrespectful — it is that there was nothing to copy. The prohibition rests on an absence of data."
    },
    "Exodus 20:19": {
      where: "The people, at the foot of the mountain, immediately after the ten words.",
      worth: "They are not refusing the covenant; they are asking for a mediator. God’s recorded response is that they have spoken well. The one thing in this scene He approves of is their request to be kept at a distance from Him."
    },
    "Exodus 24:9-11": {
      where: "Seventy-four men climb partway up Sinai once the covenant has been ratified.",
      worth: "The text says God did not stretch out His hand against them, which is the narrator conceding that He might have. Then it says they ate and drank. It is the strangest sentence in the chapter and Exodus offers no comment on it."
    },
    "Deuteronomy 5:28–29": {
      where: "God speaking to Moses about the people’s request to be kept back, out of their hearing.",
      worth: "The Hebrew is <em>mi-yitten</em> — literally <em>who will give</em>, the ordinary idiom for <em>if only</em>. Whatever theology one brings to the sentence, it is a wish, and God is the one making it."
    },
    "Ezekiel 36:26": {
      where: "Centuries later, in a prophecy to people already in exile, God says what He intends to do about the thing He wished for.",
      worth: "The wish at Sinai was for a heart. This is that wish restated as a promise, with a mechanism attached: He will do it rather than ask for it. Nothing in Deuteronomy points forward to this verse — the connection is only visible looking back."
    },
    "Deuteronomy 5:3": {
      where: "Moses addressing people who were children or unborn when Sinai happened.",
      worth: "Almost none of them were there; Deuteronomy has already said the Sinai generation died in the wilderness. He tells them it was made with them anyway. The claim is not that they misremember — it is that a covenant is not something you inherit from outside it."
    }
  },
  // ---- Chapter IV ----
  ch04: {
    "Genesis 32:20": {
      where: "Jacob is sending waves of livestock ahead of him toward a brother who last saw him twenty years ago and swore to kill him.",
      worth: "The verse says <em>face</em> four times in one breath — cover his face, go before my face, see his face, lift up my face. Every English translation smooths at least three of them into something else. The repetition is the anxiety, and it only survives in the Hebrew."
    },
    "Genesis 32:26": {
      where: "The night before the meeting. Alone at a river crossing, in a fight he has been losing since dark.",
      worth: "Jacob has spent his whole life taking blessings — from a brother, from a father, in disguise. This is the first time he asks for one. He asks while he is losing, and his hip is already out."
    },
    "Genesis 32:30–31": {
      where: "Naming the place, at dawn, walking away from it.",
      worth: "Peniel means the face of God. The next clause reports the sun rising on him and the limp in the same sentence — Hebrew narrative almost never mentions weather, and here it gives you light and injury together. He gets the dawn and he keeps the limp."
    },
    "Genesis 33:10": {
      where: "The next morning, standing in front of Esau, who has just run to him and wept on his neck.",
      worth: "He says it about his brother, one chapter after saying it about God, in the same words. Genesis lets the sentence stand for both and never explains the comparison."
    },
    "Genesis 46:30": {
      where: "Jacob, old, meeting the son he has believed dead for twenty-two years.",
      worth: "It is the third time in his life that a face ends something. Jacob is the one character in Genesis whose entire story is told in this vocabulary, and he never appears to notice that it is."
    },
    "Luke 2:29–30": {
      where: "An old man in the temple, holding an infant that strangers have just handed him.",
      worth: "Simeon says almost exactly what Jacob said: let me go now, I have seen. Luke is writing in Greek and quoting the Greek Old Testament, for readers who would have heard the echo."
    }
  },
  // ---- Chapter V ----
  ch05: {
    "Exodus 3:6": {
      where: "At the bush, at the moment God names Himself as the God of Moses’ fathers.",
      worth: "Moses hides his face before he is told to — there is no command in the verse. The fear comes first and the covering is his own idea. Forty years later he will ask to see the thing he is hiding from here."
    },
    "Exodus 3:14": {
      where: "Moses has asked for a name to give the Israelites. This is the answer he is given to carry.",
      worth: "<em>Ehyeh asher ehyeh</em> is built on the verb <em>to be</em> in an unfinished tense; Hebrew has no present tense to put it in. It can be read as I am, I will be, or I will be what I will be, and the grammar does not settle it. The name is a verb that has not stopped happening."
    },
    "Exodus 4:10": {
      where: "Moses’ fourth objection, after the name, the signs and the promise have all been given.",
      worth: "The Hebrew is literally <em>heavy of mouth and heavy of tongue</em>. Whatever the condition was, he describes it as weight. And this is the man who ends up described as speaking with God mouth to mouth."
    },
    "Exodus 4:11": {
      where: "God’s answer to the objection — and it does not contain a cure.",
      worth: "The reply names mute, deaf, seeing and blind together and claims all four. Moses’ mouth is not fixed in this scene or in any later one. Aaron is assigned to speak and the heaviness stays."
    },
    "Exodus 33:14–15": {
      where: "After the golden calf, in a negotiation where Moses has already turned down an angel as a substitute.",
      worth: "<em>My presence</em> is <em>panai</em> — literally My face. Moses answers that if the face does not go, He should not send them up at all. He refuses the land, the escort and the promise, and holds out for the one thing he has already been told he cannot see."
    },
    "Exodus 33:22": {
      where: "God agreeing to pass by, on terms, and setting out the arrangement.",
      worth: "It is physical and specific: a crevice in rock, a hand over it, the back seen afterward. It is the closest the Old Testament comes to describing the mechanics of seeing God, and every detail in it is about limiting the view."
    },
    "Psalm 84:11": {
      where: "A pilgrim song about wanting to be in the courts of the temple, not a treatise on glory.",
      worth: "The pairing is odd on purpose. A sun is the thing you need a shield from. The psalm gives both jobs to the same subject and moves on without explaining it — which is the problem the cleft of the rock was built to solve."
    },
    "Numbers 11:29": {
      where: "Moses answering Joshua, who wants two men prophesying back in the camp to be stopped.",
      worth: "He uses <em>mi-yitten</em>, the wish idiom, again. The last one recorded wishing in these terms was God, at Sinai, about their hearts. Moses makes the same wish from the other side of it."
    },
    "Numbers 12:8": {
      where: "God defending Moses to Aaron and Miriam, who have just questioned whether he is anything special.",
      worth: "<em>Peh el peh</em> — mouth to mouth — is rarer than face to face and occurs here and almost nowhere else. The same verse says Moses beholds the <em>temunah</em> of the LORD, which is the exact word Deuteronomy uses to say there was no form to see. The Bible does not resolve this."
    },
    "Numbers 13:30": {
      where: "Caleb interrupting the scouts’ report before it has finished.",
      worth: "The Hebrew has him quiet the people first — he is talking over a panic already underway. He and Joshua are the only two of the twelve who live to enter, and the vote goes ten to two."
    },
    "Numbers 14:42": {
      where: "The morning after the refusal, when the people change their minds and decide to invade after all.",
      worth: "Same crowd, same objective, one day later, and now it is forbidden. Nothing about the land has changed. What is missing is stated flatly: He is not going with them."
    },
    "Numbers 14:44": {
      where: "They go anyway. The ark stays in the camp, and so does Moses.",
      worth: "The verb behind <em>heedlessly</em> is a rare one — it turns up in only one other place in the Bible, where it means swollen or puffed up. What they did that morning has a name, and the name is presumption."
    },
    "Deuteronomy 34:10": {
      where: "The last paragraph of the Torah, written after Moses’ death, functioning as an obituary.",
      worth: "The Torah closes by saying that what it has just described has not happened again. Whoever wrote the sentence was looking back across centuries to tell the reader the category is empty, and it stays empty for the rest of the Old Testament."
    }
  },
  // ---- Chapter VI ----
  ch06: {
    "Exodus 34:29–30": {
      where: "Moses coming down the mountain the second time, carrying the second set of tablets.",
      worth: "The verb is <em>qaran</em>, from the noun for a horn — light projecting the way a horn does. The Vulgate translated it as <em>horned</em>, which is why Michelangelo’s Moses has them. The mistranslation is a thousand years old and carved in marble in Rome."
    },
    "Numbers 6:26": {
      where: "The last line of the priestly blessing, the third of three.",
      worth: "The blessing grows as it goes: three words in Hebrew, then five, then seven. The face enters at line two and is still there at line three. Whoever composed it built the shape so that the longest line is the one about a face turned toward you."
    },
    "Numbers 6:27": {
      where: "The sentence immediately after the blessing, explaining what the priests have just been told to do.",
      worth: "They are not asking for a blessing; they are placing a name. The verb is the one used for setting an object down on something. God’s own account of the ceremony is that words spoken over a face put His name on it."
    },
    "Song of Songs 2:9": {
      where: "The woman describing her beloved, who has arrived and is standing outside the wall.",
      worth: "He is at the window and he does not come in. The book is full of this — arrivals that stop just short, and a great deal of looking through things. The lattice is the point: he can be seen, in pieces, through a screen."
    },
    "Psalm 34:5": {
      where: "A psalm about deliverance, in a list of what happens to people who ask.",
      worth: "The verb behind <em>radiant</em> shares its consonants with the verb for a river flowing. And the shining here is not Moses’ — it is plural, ordinary, anyone’s. The one face in the Bible described as glowing on loan is not the only face described as glowing."
    },
    "1 Samuel 16:7": {
      where: "Samuel, in Bethlehem, looking at Eliab and about to anoint the wrong son.",
      worth: "The Hebrew is literally <em>man looks to the eyes</em> — the idiom for the surface. The person being corrected here is the prophet. He has read a face wrong, on the job, with the horn of oil already in his hand."
    },
    "Acts 6:15": {
      where: "Stephen on trial in front of the council, in the middle of the accusation against him.",
      worth: "Luke reports it as something the council saw, not something Stephen claimed. Outside the transfiguration it is the only time the New Testament describes a face this way, and it happens to a man who is about to be stoned in the street."
    },
    "Acts 4:13": {
      where: "Peter and John in front of the same council, two chapters earlier.",
      worth: "The word the council uses of them is <em>agrammatoi</em> — unlettered. What is recognised is not competence. It is proximity, visible on two men who cannot account for it themselves."
    },
    "Psalm 34:8": {
      where: "Three verses after the radiance, in the same psalm.",
      worth: "It is an invitation, not a report. The psalm has been describing what happened to other people and here it turns to the reader and asks for a trial. Hebrew mixes the senses without apology — you are told to taste a fact."
    },
    "Psalm 67:1": {
      where: "The opening line of a short psalm, borrowing the priestly blessing almost word for word.",
      worth: "Someone took the blessing spoken over Israel and turned it into a prayer Israel prays. The direction reverses: words handed down from the altar come back up as a request."
    },
    "Psalm 67:2": {
      where: "The second line, giving the reason for the first.",
      worth: "The psalm asks for the shining face and then says what it is for, and the answer is not Israel. The blessing is requested as a means of transmission — light on one face so that other nations can see by it."
    }
  },
  // ---- Chapter VII ----
  ch07: {
    "Ezekiel 11:23": {
      where: "The end of a vision in which Ezekiel has watched the glory leave the temple by stages.",
      worth: "The mountain east of the city is the Mount of Olives. Ezekiel tracks the departure in moves — off the cherub, to the threshold, to the east gate, out — and it stops on the hill Jesus comes down six centuries later. The glory leaves slowly, and it leaves by a named door."
    },
    "Hosea 5:15": {
      where: "God stating the terms of a withdrawal, in the middle of a judgment oracle.",
      worth: "The withdrawal has a condition attached, which makes it a strategy rather than an abandonment. And the condition is not repentance in the abstract: it is that they come looking for a face."
    },
    "Deuteronomy 31:17–18": {
      where: "God’s last instructions to Moses, telling him in advance what the people will do and what He will do about it.",
      worth: "The Hebrew doubles the verb — <em>haster astir</em>, hide I will hide — which is how the language says a thing when it means it. Cain used this verb about himself. Here God uses it about Himself, twice, in one breath."
    },
    "Isaiah 45:15": {
      where: "Dropped in as an aside, in the middle of a passage about Cyrus and the nations.",
      worth: "It is not a complaint and it is not an accusation. The sentence sits inside a hymn about God’s power, and the same clause that says He hides calls Him Savior. Isaiah puts both in one line and softens neither."
    },
    "2 Samuel 14:24": {
      where: "David permitting Absalom back into Jerusalem after the killing of Amnon, on one condition.",
      worth: "Absalom lives in the city two years without being seen. The rebellion that nearly ends David’s reign starts inside that gap. The narrator gives the arrangement a single sentence and lets the reader watch it work."
    },
    "Psalm 23:5": {
      where: "The psalm’s turn, where the shepherd becomes a host and the field becomes a room.",
      worth: "<em>In the presence of</em> is <em>neged</em> — in front of, facing. The enemies are not defeated in this line and they have not left. They are watching, and the meal happens anyway."
    },
    "2 Samuel 9:11": {
      where: "After David asks whether anyone is left of Saul’s house, and is told there is one.",
      worth: "The narrator waits until the very end of the chapter to add that he was lame in both feet. Under the table nothing has changed. At the table he is a son."
    },
    "1 Kings 19:13": {
      where: "Elijah at the mouth of the cave on Horeb, after the wind, the earthquake and the fire.",
      worth: "He covers his face for the thin silence, not for the fire. And Horeb is Sinai — the text has put him standing where Moses stood in the cleft, on purpose, and gives him a different answer."
    },
    "John 11:35": {
      where: "At the tomb of Lazarus, minutes before raising him.",
      worth: "He knows what He is about to do. The shortest verse in the Bible is a man weeping over a death he will reverse within the hour, which means the weeping is not about the outcome."
    },
    "Psalm 31:20": {
      where: "In a psalm otherwise full of enemies, slander and plots.",
      worth: "The Hebrew is <em>in the seter of Your panim</em> — the hiding of Your face. Both of those words have been the trouble for two chapters. Here they are put together and the result is sanctuary."
    },
    "Isaiah 54:8": {
      where: "Immediately after the servant song, in a passage that addresses a city the way one addresses a wife.",
      worth: "The measurement is the argument: a moment against everlasting. Isaiah does not deny the hiding. He puts it on a scale and shows you the other side of it."
    },
    "2 Chronicles 7:14": {
      where: "God answering Solomon at night, after the temple has been dedicated.",
      worth: "The verse is quoted constantly and the middle of it usually goes missing. What is asked for is not a policy — it is four verbs, humble, pray, seek and turn, and the object of the seeking is a face."
    },
    "2 Chronicles 7:15": {
      where: "The next sentence, and the promise attached to the condition.",
      worth: "The answer to a face sought is a face turned: eyes open, ears attentive, in this place. It is the exact reversal of the hiding promised in Deuteronomy, and it is promised over the building Ezekiel will later watch emptied."
    },
    "Daniel 9:17": {
      where: "Daniel praying in Babylon, having worked out from Jeremiah’s scrolls how long the exile was meant to last.",
      worth: "He prays the priestly blessing back over a ruin. The words are the ones spoken in the temple, and he is saying them about the temple, from another country, because there is nobody left there to say them."
    },
    "Ezekiel 43:2": {
      where: "In Ezekiel’s vision of a restored temple, twenty years after he watched the glory leave.",
      worth: "It returns by the road it left on. Ezekiel is precise about the compass in both visions, and that is the only reason the direction means anything. He wrote down the exit so that the return could be recognised."
    }
  },
  // ---- Chapter VIII ----
  ch08: {
    "Luke 9:29": {
      where: "On the mountain, while He is praying, with three disciples who have just been told about the cross.",
      worth: "Luke says it happened while He was praying; Matthew and Mark do not. And Luke avoids the verb the other two use — <em>metamorphothe</em> — which is the word his Greek readers knew from stories of gods changing shape."
    },
    "Isaiah 50:7": {
      where: "The third servant song, in the servant’s own voice, describing what he is about to endure.",
      worth: "Flint is not toughness in general. It is the stone that will not chip when it is struck, and it is what you strike to make fire. The image is chosen for a passage about a back given to those who strike it."
    },
    "Ezekiel 21:2": {
      where: "One of many commands to the prophet in Ezekiel that begin in exactly this way.",
      worth: "<em>Set your face toward</em> is a stock prophetic formula for turning to deliver a judgment. Luke uses the same construction about Jesus turning toward Jerusalem, for readers of the Greek Old Testament who would have known where it came from."
    },
    "Luke 19:41": {
      where: "At the top of the descent from the Mount of Olives, on the way in, with a crowd shouting around Him.",
      worth: "The Greek verb is not the one used at Lazarus’ tomb. This one means to wail out loud. He is in a parade, going downhill, on the same slope where Ezekiel watched the glory stop."
    },
    "Isaiah 53:3": {
      where: "In the fourth servant song, describing not what he suffered but how he was received.",
      worth: "The hiding runs the other way in this verse. Everywhere else in this book it is God’s face that is hidden; here it is ours, and the one being hidden from is the servant."
    },
    "Matthew 26:39": {
      where: "In the garden, past midnight, with the three asleep a stone’s throw off.",
      worth: "Matthew records the posture: on His face, on the ground. It is the position taken by Moses, by Joshua, by Ezekiel, by John on Patmos — always in front of God. Here it is taken by the one they were in front of."
    },
    "Isaiah 6:5": {
      where: "Isaiah’s commissioning vision, in the temple, in the year King Uzziah died.",
      worth: "He does not say he is afraid. He says he is undone, and gives the reason as his lips — the one part of him he is about to be commissioned to use. The coal is applied to the part he named."
    },
    "John 12:41": {
      where: "John quoting Isaiah 6 to explain why people did not believe what they were shown.",
      worth: "He states plainly whose glory Isaiah saw in the temple that year. It is one of the most direct identifications in the Gospels and it is made in a passing clause, inside an argument about something else."
    },
    "Luke 22:61": {
      where: "In the high priest’s courtyard, at the third denial, as a rooster crows.",
      worth: "Only Luke records the look, and only Luke places the two men where it is possible — Jesus is being held within sight of the fire. Nothing is said. Peter goes outside and weeps."
    },
    "Psalm 22:24": {
      where: "In the second half of the psalm that opens with <em>why have you forsaken me</em>.",
      worth: "The psalm quoted from the cross does not stay where it starts. Twenty verses after the forsaking it says the face was not hidden, and it ends by declaring this to a generation not yet born."
    },
    "Hebrews 2:13": {
      where: "The writer of Hebrews assembling Old Testament lines and putting them in the Son’s mouth.",
      worth: "The quotation is Isaiah 8:17, and the sentence directly before it there is about waiting for a God who is hiding His face. Hebrews takes the trust and leaves the context standing for anyone who goes and looks."
    },
    "Isaiah 53:12": {
      where: "The last verse of the last servant song, stating the terms of what has happened.",
      worth: "The verb is the one used for pouring out a drink offering, and the word behind <em>himself</em> is <em>nephesh</em> — life, throat, the self. It is sacrificial language applied to a person rather than to what a person brings."
    },
    "Mark 15:39": {
      where: "The centurion, at the foot of the cross, after the veil has torn.",
      worth: "Mark opens his gospel by calling Jesus the Son of God and then lets no human being say it for fifteen chapters. The first one who does is a Roman soldier who has just watched Him die, and Mark notes that he was standing facing Him."
    }
  },
  // ---- Chapter IX ----
  ch09: {
    "John 20:12": {
      where: "Mary Magdalene, alone at the tomb, looking in after the others have gone home.",
      worth: "One at the head and one at the feet with the space between them empty is the arrangement of the mercy seat: two figures facing each other across a gap. John does not say so. He describes the furniture and lets it be recognised."
    },
    "Luke 24:31": {
      where: "At a table in Emmaus, at the breaking of bread, after a seven-mile walk.",
      worth: "The recognition comes at a gesture, not at an argument. He has already explained the Scriptures to them for hours and they knew nothing. It is the hands they know."
    },
    "Genesis 3:7": {
      where: "In the garden, immediately after eating.",
      worth: "It is the same phrase, and this is the only other place it lands this way. Eyes opened in Eden produce nakedness and hiding; eyes opened at Emmaus produce recognition. In the Greek Old Testament Luke was using, the two sentences are nearly identical."
    },
    "John 21:9": {
      where: "On the shore at daybreak, after a night of catching nothing.",
      worth: "The word is <em>anthrakia</em>, a charcoal fire, and John uses it exactly twice: here, and in the courtyard where Peter denied Him. It is a rare word. He does not explain the repetition and he did not need to."
    },
    "Isaiah 43:25": {
      where: "In a passage where God is listing everything Israel has failed to bring Him.",
      worth: "The reason given is not their repentance. It is <em>for My own sake</em> — forgiveness stated as something He does for Himself, which is the least sentimental ground available and the most stable."
    },
    "Matthew 25:21": {
      where: "In a parable about money left with staff, told days before the arrest.",
      worth: "The commendation is identical for the man given five and the man given two — same words, in the same order, a few verses apart. The amounts differ and the praise does not."
    },
    "Luke 24:51": {
      where: "At Bethany, at the very end of Luke’s gospel.",
      worth: "His hands are up in the priestly gesture when He goes. Luke’s gospel opened with a priest coming out of the temple unable to speak the blessing. It closes with the blessing being given, and not finished."
    },
    "Ezekiel 39:29": {
      where: "At the end of the long judgment section, immediately before the temple vision begins.",
      worth: "This is the sentence that closes the hiding. The same prophet who described the glory leaving is given the line that ends it, and the reason attached is a Spirit poured out."
    },
    "Exodus 38:8": {
      where: "A single line in the inventory of tabernacle furnishings, between two other measurements.",
      worth: "The basin the priests washed their faces in was made from donated bronze mirrors. The text names the donors and moves straight on. Whoever kept the inventory kept the detail that the water they saw themselves in stood in metal that used to show them themselves."
    },
    "2 Corinthians 4:6": {
      where: "Paul defending his ministry, and reaching all the way back to Genesis to do it.",
      worth: "He quotes the first day of creation and lands the sentence on a face. The chain is long and deliberate — light spoken into darkness, then into hearts, then found in a face — and it is the nearest thing the New Testament has to a definition of what this book has been following."
    }
  },
  // ---- Chapter X ----
  ch10: {
    "John 14:9": {
      where: "In the upper room, answering Philip, who has just asked to be shown the Father.",
      worth: "Philip’s request is the one Moses made. He gets a different answer, and the answer is a person who has been standing in front of him for three years."
    },
    "John 14:21": {
      where: "A few sentences later, in the same conversation, at the same table.",
      worth: "The verb is <em>emphanizo</em> — to show plainly, to make visible; it is a legal and physical word. Jesus attaches it not to a vision but to keeping what He said."
    },
    "John 14:23": {
      where: "Answering Judas — not Iscariot — who has asked why He will show Himself to them and not to the world.",
      worth: "The word for <em>abode</em> is <em>mone</em>, and it appears twice in the whole New Testament: here, and at the start of this same chapter, where it is the many rooms in the Father’s house. The room prepared there and the dwelling made here are one word."
    },
    "Acts 7:56": {
      where: "Stephen, mid-stoning, looking up and reporting what he sees.",
      worth: "Everywhere else in the New Testament the Son of Man is seated. Here He is standing. Stephen’s last recorded observation is a change of posture, and the crowd covered their ears at it."
    },
    "Luke 22:20": {
      where: "At the table, after supper, on the night He was betrayed.",
      worth: "<em>New covenant</em> is Jeremiah’s phrase, and what Jeremiah promised under it was a law written inside and a knowing of God that needs no teacher. The cup is handed over with that promise attached to it."
    },
    "2 Corinthians 3:18": {
      where: "The conclusion of Paul’s long argument about Moses and the veil.",
      worth: "<em>We all</em> is the load-bearing phrase. Paul has spent the chapter on one man’s shining face and here he hands it to everybody — and the verb he uses for the change is <em>metamorphoo</em>, the transfiguration word."
    },
    "Song of Songs 2:14": {
      where: "The man speaking to the woman, who is out of sight somewhere in the rocks.",
      worth: "It is a request, not a command, and it is made to someone hiding. The reason he gives is that her face is lovely, which means the asking is not about information."
    },
    "Genesis 24:65": {
      where: "Rebekah, seeing Isaac in the field for the first time, before the marriage.",
      worth: "The veil goes on for the meeting and comes off at the marriage. It is the same object Paul is arguing about two thousand years later, here in its original setting, where taking it off is the good news."
    },
    "Hosea 2:19–20": {
      where: "The end of the wilderness passage, after the thorns, the wall and the alluring.",
      worth: "The verb <em>I will betroth</em> is repeated three times in two verses, each time with different terms attached — righteousness and justice, then lovingkindness and compassion, then faithfulness. The last clause is that she will know Him, in the verb Hebrew uses for a marriage."
    },
    "Revelation 19:9": {
      where: "A voice from the throne interrupting to tell John to write this particular line down.",
      worth: "It is one of seven beatitudes in Revelation and the only one about a meal. Twice in the book John tries to worship the messenger immediately after a sentence like this one, and twice he is stopped."
    },
    "Isaiah 25:6–8": {
      where: "In the middle of Isaiah’s apocalypse: a mountain, and on it a table.",
      worth: "The passage says He will swallow up the covering that covers all peoples — a veil, on a mountain, removed at a meal — and then death, swallowed the same way. Paul quotes the clause about death. The clause about the veil is in the same sentence."
    },
    "1 Corinthians 13:12": {
      where: "The end of the love chapter, which was written to settle an argument about spiritual gifts.",
      worth: "Paul puts the Hebrew phrase into Greek — <em>prosopon pros prosopon</em>, face to face — and carries it over intact. Ancient mirrors were polished bronze, so <em>dimly</em> is not a metaphor about eyesight. It is what a mirror was."
    },
    "1 John 3:2–3": {
      where: "In a letter, in the middle of a passage about what it means to be children.",
      worth: "The logic runs the opposite way to the expected one: we will be like Him because we will see Him. The seeing does the changing. It is the same claim Paul made about the mirror, put more plainly."
    },
    "Revelation 2:17": {
      where: "The end of the letter to Pergamum, in a promise made to whoever overcomes.",
      worth: "A name nobody else can read is not a public honour; it is private. And it is given on a white stone, which in that world was most often the token that got you into a feast."
    },
    "Song of Songs 5:2": {
      where: "The woman, half asleep, hearing someone at the door.",
      worth: "In the verses that follow she takes too long to open it, and by the time she does he has gone. The book that ends in union keeps this scene in the middle of it and does not remove it."
    },
    "Revelation 3:20": {
      where: "In the letter to Laodicea, a church the letter has just called lukewarm and self-satisfied.",
      worth: "He is standing outside a church, not outside an individual, and what is promised is dinner. It is the scene from Song of Songs, restaged in a letter, with the outcome left open."
    },
    "Revelation 3:21": {
      where: "The last promise in the last of the seven letters.",
      worth: "It is the highest offer in the book and it is made to the worst of the seven churches. The order is not accidental — the letters run from Ephesus to Laodicea and the reward gets larger as the church gets colder."
    },
    "Numbers 6:24–26": {
      where: "The last words of the book, and the same words it opened with.",
      worth: "It is the oldest surviving text of Scripture anyone has found, and it has been said over bowed heads for three thousand years. Every line of it is about a face turned toward you."
    }
  }
};
