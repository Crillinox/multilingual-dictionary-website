// ── Dark/Light mode ─────────────────────────────────────────
const modeToggle = document.getElementById('modeToggle');
const savedMode  = localStorage.getItem('mode') || 'light';

if (savedMode === 'dark') {
  document.body.classList.add('dark-mode');
  modeToggle.textContent = '☽';
}

modeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  modeToggle.textContent = isDark ? '☽' : '☀';
  localStorage.setItem('mode', isDark ? 'dark' : 'light');
});


// ── Word class ───────────────────────────────────────────────
class Word {
  constructor(name, definition, partOfSpeech, transJA, transES, transZH) {
    this.name         = name;
    this.definition   = definition;
    this.partOfSpeech = partOfSpeech;
    this.transJA = transJA || '';
    this.transES = transES || '';
    this.transZH = transZH || '';
  }

  // Broad POS category for filtering
  get posCategory() {
    const pos = this.partOfSpeech.toLowerCase();
    if (pos.includes('noun') || pos.includes('pronoun') || pos.includes('determiner') ||
        pos.includes('article') || pos.includes('counter') || pos.includes('abbreviation')) return 'noun';
    if (pos.includes('verb'))        return 'verb';
    if (pos.includes('adjective'))   return 'adjective';
    if (pos.includes('adverb'))      return 'adverb';
    if (pos.includes('preposition') || pos.includes('conjunction') || pos.includes('particle')) return 'preposition';
    return 'other';
  }
}

const wordsText = `a|used before nouns to indicate one non-specific item|article
ability|the power or capacity to do something|noun
able|having the power, skill, or means to do something|adjective
about|on the subject of; concerning / approximately|preposition/adverb
above|at a higher level or layer than / earlier in a list|preposition/adverb
accept|to receive or agree to something offered|verb
according|in agreement with; as stated by|adverb
account|a record or report of financial transactions / a reason or explanation|noun
across|from one side to the other of / throughout|preposition
act|to do something; to perform / a formal decision or law|verb/noun
action|the fact or process of doing something / a legal proceeding|noun
activity|a thing that a person or group does / a state of action|noun
actually|in fact; really|adverb
add|to join or combine something with something else|verb
address|a location or place where someone lives or an organization is situated / a formal speech|noun/verb
administration|the process or activity of running a business, organization, etc. / the executive branch of government|noun
admit|to confess or acknowledge something / to allow entry|verb
adult|a person who is fully grown or developed / fully grown (of an animal)|noun/adjective
affect|to have an effect on; to influence|verb
after|following in time or order / behind in space|preposition
again|once more; another time|adverb
against|in opposition / touching or leaning on|preposition
age|the length of time that a person or thing has existed / the period of history|noun
agency|a business or organization providing a particular service / the capacity to act independently|noun
agent|a person or thing that takes an active role or produces a specified effect / a substance that causes a chemical reaction|noun
ago|before the present; in the past|adverb
agree|to have the same opinion about something / to consent to a proposal|verb
agreement|a negotiated and typically legally binding arrangement / harmony|noun
ahead|in front; forward|adverb
air|the invisible gaseous substance surrounding the earth / a tune or melody|noun
all|used to refer to the whole quantity or extent of something / completely|determiner/adverb
allow|to permit or enable someone to do something|verb
almost|not quite; very nearly|adverb
alone|having no one else present / without any other thing|adjective/adverb
along|following the length or direction of / together with|preposition
alphabet|a set of letters or symbols in a fixed order used to write the words of a language, where each character typically represents a specific speech sound|noun
already|before now or before a specified or implied time|adverb
also|in addition; too|adverb
although|used to introduce a statement contrasting with what has been said|conjunction
always|at all times; on every occasion|adverb
American|of or relating to the United States of America / a native or citizen of the U.S.|adjective/noun
among|in the midst of; surrounded by|preposition
amount|a quantity of something / the total of something|noun
analysis|detailed examination of the elements or structure of something / a branch of mathematics|noun
and|used to connect words or phrases / also|conjunction
animal|a living organism that feeds on organic matter / a creature|noun
another|one more; an additional one / a different one|determiner
answer|a thing said, written, or done to deal with a question / a solution|noun/verb
any|used to refer to one or some of a thing or number of things / at all|determiner/adverb
anyone|any person at all|pronoun
anything|used to refer to any thing / any matter|pronoun
appear|to come into view; to become visible / to seem|verb
apply|to put something to use; to make a formal request|verb
approach|a way of dealing with something / the act of coming near|noun/verb
area|a region or part of a surface / a subject of study|noun
argue|to give reasons or cite evidence in support of an idea / to dispute|verb
arm|a human limb used for lifting or holding / a division of a military force|noun
around|in a circle or surrounding something / approximately|preposition/adverb
arrive|to reach a destination|verb
art|the expression or application of human creative skill / a skill or craft|noun
article|a piece of writing in a newspaper or magazine / a item of clothing|noun
artist|a person who creates art / a performer|noun
as|used to indicate a role or function / while|conjunction
ask|to say something to request information / to invite|verb
assume|to suppose something to be the case without proof / to take on responsibility|verb
at|used to indicate location or time / in the direction of|preposition
attack|to act against someone or something violently / a sudden onset|verb/noun
attention|notice taken of someone or something / care|noun
attorney|a person authorized to act on another’s behalf / a lawyer|noun
audience|a group of spectators or listeners / a readership|noun
author|the writer of a book, article, or other text / the originator of something|noun
authority|the power or right to give orders or make decisions / an expert|noun
available|able to be used or obtained / free|adjective
avoid|to keep away from; to prevent|verb
away|at a distance in space or time / not present|adverb
aws|amazon web service; a comprehensive cloud computing platform provided by Amazon that delivers on-demand infrastructure, storage, networking, and software services over the internet on a pay-as-you-go basis.|noun
baby|a very young child or infant / a small version of something|noun
back|the rear part of a person or thing / to support|noun/verb
bad|of poor quality or low standard / unpleasant|adjective
bag|a container made of flexible material / to capture|noun/verb
ball|a round object used in games / a formal social gathering|noun
bank|a financial institution / the sloping land beside a body of water|noun
bar|a place where alcoholic drinks are served / a long piece of material|noun
base|the bottom or supporting part of something / a military post|noun
bash| Bourne-Again Shell, used by linux and previously macinotosh in the terminal|noun
be|to exist or live / to occur|verb
beat|to strike repeatedly / to defeat|verb
beautiful|pleasing the senses or mind aesthetically|adjective
because|for the reason that|conjunction
become|to begin to be / to develop into|verb
bed|a piece of furniture for sleeping / a place where something grows|noun
before|earlier than; in front of|preposition
begin|to start|verb
behavior|the way in which one acts or conducts oneself / conduct|noun
behind|at the back of / late|preposition/adverb
believe|to accept something as true / to trust|verb
benefit|an advantage or profit gained from something / to gain an advantage|noun/verb
best|of the highest quality / most suitable|adjective/adverb
better|of higher quality than another / improved|adjective/adverb
between|in the space separating two things / among|preposition
beyond|on the farther side of / exceeding|preposition
big|of large size or extent / important|adjective
bill|a statement of money owed / a proposed law|noun
billion|a number equal to one thousand million / a very large number|noun
bit|a small piece or amount / a unit of data|noun
black|of the darkest color / dark-colored|adjective
blood|the red liquid circulating in the bodies of humans and animals / family lineage|noun
blue|of the color of the clear sky / feeling sad|adjective
board|a flat piece of material / a group of people who manage something|noun
body|the physical structure of a person or animal / a group of people|noun
book|a written or printed work / to reserve|noun/verb
born|to come into existence / by birth|verb/adjective
both|used to refer to two things together / each|determiner
box|a container with a flat base and sides / to fight|noun/verb
boy|a male child / a young man|noun
break|to separate into pieces / to interrupt|verb
bring|to carry or take someone or something to a place / to cause|verb
brother|a male sibling / a member of a group|noun
bsd|a discontinued unix operating system with a seperate design philosophy from linux|noun
budget|an estimate of income and expenditure / to plan financially|noun/verb
build|to construct something / to develop|verb
building|a structure with a roof and walls / construction|noun
business|commercial activity or enterprise / a concern|noun
but|used to introduce a contrast / except|conjunction/preposition
buy|to obtain something in exchange for money / to believe|verb
by|indicating the agent performing an action / near|preposition
c|third letter of the english alphabet / a low level programming language with a general-purpose, procedural programming style developed in the early 1970s by Dennis Ritchie at Bell Labs|noun
c++|a low-level object oriented programming language with general-purpose, multi-paradigm programming created by Bjarne Stroustrup in 1979 and first released in 1985 as an extension of the C language|noun
c#|a general-purpose, multi-paradigm, object-oriented programming language developed by Microsoft and primarily used to build applications on the .NET platform with similar-looking syntax to java|noun
call|to give someone or something a name / to telephone|verb
camera|a device for taking photographs / a part of a film projector|noun
campaign|a series of actions to achieve a goal / a military operation|noun
can|to be able to / a container|verb/noun
cancer|a disease involving uncontrolled cell growth / a zodiac sign|noun
candidate|a person running for office / a contender|noun
capital|a city that serves as the seat of government / financial assets|noun
car|a road vehicle with an engine / a railway carriage|noun
card|a small piece of thick paper or plastic / a playing card|noun
care|the provision of what is necessary for health / concern|noun
career|an occupation undertaken for a significant period / a rapid movement|noun
carry|to support and move something from one place to another / to conduct|verb
case|an instance of something occurring / a container|noun
catch|to seize or capture something / to understand|verb
cause|a person or thing that produces an effect / to make happen|noun/verb
cell|the smallest structural unit of living organisms / a small room|noun
center|the middle point of something / to concentrate|noun/verb
central|located in the middle / crucial|adjective
century|a period of 100 years / a hundred years|noun
certain|definite or sure / a particular|adjective
certainly|without doubt|adverb
chair|a piece of furniture for sitting / a position of authority|noun
challenge|a call to take part in a contest / a difficulty|noun/verb
chance|a possibility of something happening / luck|noun
change|the act or result of making or becoming different / coins|noun
character|the mental and moral qualities of a person / a symbol|noun
charge|an instruction or command / a cost|noun/verb
check|to examine something to ensure accuracy / a pattern|verb/noun
child|a young human being / offspring|noun
choice|an act of selecting or making a decision / an option|noun
choose|to pick out or select|verb
church|a building for public Christian worship / the Christian community|noun
citizen|a legally recognized subject or national of a state / a resident|noun
city|a large town / urban area|noun
civil|relating to ordinary citizens / polite|adjective
claim|to assert something as a right or possession / a demand|verb/noun
class|a group of students or a social group / a category|noun
clear|easy to understand or see / unobstructed|adjective
clearly|in a clear manner|adverb
close|near in space or time / to shut|adjective/verb
coach|a person who trains athletes / a large vehicle|noun
cold|of low temperature / unfriendly|adjective
collection|a group of objects gathered together / a gathering|noun
college|an educational institution / a society|noun
color|the property of an object that produces different sensations on the eye / to tint|noun/verb
come|to move toward the speaker or observer / to arrive|verb
commercial|related to trade or commerce / an advertisement|adjective/noun
common|occurring frequently / shared|adjective
community|a group of people living in the same place / a group with common interests|noun
company|a business organization / companionship|noun
compare|to examine for similarities or differences / to liken|verb
computer|an electronic device for storing and processing data / a calculator|noun
concern|a matter that affects one's interest or welfare / to worry|noun/verb
condition|a state of being / to train or prepare|noun/verb
conference|a formal meeting for discussion / a group of teams|noun
Congress|the legislative body of a country / a meeting|noun
consider|to think about something carefully / to regard|verb
consumer|a person who buys goods or services / one who uses|noun
contain|to hold or include something / to restrain|verb
continue|to persist in an activity / to carry on|verb
control|the power to influence or direct people's behavior / to manage|noun/verb
cost|the amount of money needed to buy something / to require|noun/verb
could|past tense of can / to be able to|modal verb
country|a nation with its own government / rural area|noun
couple|two people in a romantic relationship / a few|noun
course|a series of lectures or lessons / a path|noun
court|a place where legal cases are heard / a playing area|noun
cover|to place something over or upon / a protective layer|verb/noun
create|to bring something into existence / to cause|verb
crime|an action that is forbidden by law / a serious mistake|noun
css|cascading style sheet, used to decorate html pages|noun
cultural|relating to the arts and other manifestations of human intellectual achievement|adjective
culture|the ideas, customs, and social behavior of a society / the cultivation of bacteria|noun
cup|a small container for drinking / a trophy|noun
current|belonging to the present time / a flow of water or electricity|adjective/noun
customer|a person who buys goods or services / a client|noun
cut|to make an opening or incision with a sharp tool / a reduction|verb/noun
dark|without light / mysterious|adjective
data|facts and statistics collected together / information|noun
daughter|a female child / a female descendant|noun
day|a period of 24 hours / daylight|noun
dead|no longer alive / inactive|adjective
deal|an agreement or arrangement / to distribute|noun/verb
death|the end of life / destruction|noun
debate|a formal discussion on a particular topic / argument|noun/verb
decade|a period of 10 years / ten years|noun
decide|to make a choice or judgment / to resolve|verb
decision|a conclusion or resolution reached after consideration / a verdict|noun
deep|extending far down from the top or surface / intense|adjective
defense|the action of defending from attack / a legal plea|noun
degree|a unit of measurement of temperature or angle / a level of attainment|noun
Democrat|a member of the Democratic Party / a supporter of democracy|noun
democratic|relating to democracy / egalitarian|adjective
describe|to give an account of something in words / to depict|verb
design|a plan or drawing produced to show the look of something / intention|noun/verb
despite|without being affected by|preposition
detail|a small or individual part of something / to describe thoroughly|noun/verb
determine|to firmly decide or resolve / to establish|verb
develop|to grow or cause to grow / to process film|verb
development|the process of developing / a real estate project|noun
die|to cease to live / a tool for shaping metal|verb/noun
difference|a point or way in which people or things are not the same / a disagreement|noun
different|not the same as another or each other / distinct|adjective
difficult|needing much effort or skill to accomplish / hard|adjective
dinner|the main meal of the day / a social gathering|noun
direction|the course along which something moves / instructions|noun
director|a person who manages or supervises something / a film director|noun
discover|to find something for the first time / to realize|verb
discuss|to talk about something / to examine|verb
discussion|a conversation or debate / deliberation|noun
disease|a disorder of structure or function / illness|noun
do|to perform an action / to suffice|verb
doctor|a person qualified to treat people who are ill / to alter|noun/verb
dog|a domesticated carnivorous mammal / to follow closely|noun/verb
door|a movable barrier for entering or leaving a building / an entrance|noun
down|toward or in a lower place / depressed|adverb/adjective
draw|to produce a picture by making lines on a surface / to pull|verb
dream|a series of thoughts, images, and sensations during sleep / an aspiration|noun/verb
drive|to operate and control the direction and speed of a vehicle / to impel|verb
drop|to fall or let something fall / a small amount|verb/noun
drug|a medicine or other substance that has a physiological effect / to administer|noun/verb
during|throughout the course or duration of|preposition
each|every one of two or more people or things|determiner
early|occurring before the usual or expected time / premature|adjective
east|the direction toward which the sun rises / eastern region|noun
easy|not difficult / relaxed|adjective
eat|to put food into one’s mouth and chew and swallow it|verb
economic|relating to the economy / financially viable|adjective
economy|the wealth and resources of a country / thrift|noun
edge|the outside limit of an object / advantage|noun
education|the process of receiving or giving systematic instruction / schooling|noun
effect|a change that is a result or consequence of an action / influence|noun
effort|a vigorous or determined attempt / exertion|noun
eight|the number 8|noun
either|one or the other of two people or things / also|determiner/adverb
election|a formal group decision-making process / selection|noun
else|other; different|adverb
employee|a person employed for wages or salary / a worker|noun
end|the final part of something / to terminate|noun/verb
energy|the strength and vitality required for sustained physical or mental activity / enthusiasm|noun
enigmatic|mysterious|adjective
enjoy|to take pleasure in something|verb
enough|to the required degree / sufficient|adverb/adjective
enter|to come or go into a place / to participate|verb
entire|whole; complete|adjective
environment|the surroundings or conditions in which a person, animal, or plant lives / ecosystem|noun
environmental|relating to the natural world|adjective
especially|to a great extent; particularly|adverb
establish|to set up on a firm or permanent basis / to prove|verb
even|used to emphasize something surprising or unexpected / level|adverb/adjective
evening|the period of time from late afternoon to night / night|noun
event|a thing that happens or is regarded as happening / a planned occasion|noun
ever|at any time in the past or future|adverb
every|used to refer to all members of a group|determiner
everybody|every person|pronoun
everyone|every person|pronoun
everything|all things|pronoun
evidence|facts or information indicating whether a belief or proposition is true / proof|noun
exactly|in a precise manner / precisely|adverb
example|a thing characteristic of its kind / a model|noun
executive|a person who manages or administers something / relating to execution|noun/adjective
exist|to have reality or actuality / to live|verb
expect|to regard something as likely to happen / to anticipate|verb
experience|practical contact with and observation of facts / an event|noun
expert|a person with great knowledge or skill in a particular area / a specialist|noun
explain|to make something clear or intelligible|verb
eye|the organ of sight / attention|noun
face|the front part of the head / to confront|noun/verb
fact|a thing that is known or proved to be true / reality|noun
factor|a circumstance, fact, or influence contributing to a result / a divisor|noun
fail|to be unsuccessful / to neglect|verb
fall|to drop down from a higher to a lower level / autumn|verb/noun
family|a group of people related by blood or marriage / a group of similar things|noun
far|to or at a great distance / distant|adverb/adjective
fast|moving or capable of moving at high speed / not eating|adjective/verb
father|a male parent / a founder|noun
fear|an unpleasant emotion caused by the threat of danger / reverence|noun
federal|relating to a system of government / national|adjective
feel|to have a sensation or emotion / to touch|verb
feeling|an emotional state or reaction / intuition|noun
few|not many / a small number|determiner
field|an area of open land / a branch of study|noun
fight|to engage in a physical struggle / a contest|verb/noun
figure|a number or amount / a shape|noun
fill|to put something into a container until it is full / to satisfy|verb
film|a motion picture / a thin layer|noun
final|occurring at the end / conclusive|adjective
finally|at the end of a period of time or a sequence of events|adverb
financial|relating to money / monetary|adjective
find|to discover or locate something / to determine|verb
fine|of high quality / a penalty|adjective/noun
finger|one of the digits of the hand / to touch|noun/verb
finish|to bring something to an end / to complete|verb
fire|combustion producing heat and light / to dismiss|noun/verb
firm|a business company / solid|noun/adjective
first|coming before all others in time or order / foremost|adjective
fish|a limbless cold-blooded vertebrate animal / to catch fish|noun/verb
five|the number 5|noun
floor|the lower surface of a room / to knock down|noun/verb
fly|to move through the air / to travel by air|verb
focus|the center of interest or activity / to concentrate|noun/verb
follow|to come after someone or something / to obey|verb
food|any nutritious substance consumed to provide energy / cuisine|noun
foot|the lower extremity of the leg / a unit of measurement|noun
for|indicating the object of a feeling or action / because of|preposition
force|strength or energy exerted or brought to bear / to compel|noun/verb
foreign|of, from, or relating to a country other than one’s own / unfamiliar|adjective
forget|to fail to remember / to omit|verb
form|the visible shape or configuration of something / to create|noun/verb
former|previously mentioned or experienced / the first of two|adjective
forward|toward the front or ahead / to send|adverb/verb
four|the number 4|noun
free|able to act or speak without hindrance / without cost|adjective
friend|a person with whom one has a bond of mutual affection / a supporter|noun
from|indicating the starting point of a movement / away|preposition
front|the forward part or surface of something / to face|noun/verb
full|containing or holding as much as possible / complete|adjective
fund|a sum of money saved or collected for a particular purpose / to finance|noun/verb
future|time that is to come / coming events|noun
game|a form of play or sport / a strategy|noun
garden|a piece of ground where plants are grown / to cultivate|noun/verb
gas|a substance in a state that expands freely / gasoline|noun
general|affecting or relating to all or most people / a military rank|adjective/noun
generation|all the people born and living at about the same time / production|noun
get|to obtain or receive something / to become|verb
girl|a female child / a young woman|noun
git|a distributed version control system designed to track changes in source code and data files during software development|noun
github|a cloud-based platform where you can store, share, and work together with others to write code|noun
give|to present voluntarily / to yield|verb
glass|a hard, brittle substance used for making windows / a drinking container|noun
go|to move or travel from one place to another / to function / A programming language developed by google|verb/verb/noun
goal|the object of a person’s ambition or effort / a scored point|noun
good|of a favorable character or tendency / beneficial|adjective
google|the brand name for a leading internet search engine, founded in 1998, part of parent company alphabet|noun
government|the governing body of a nation, state, or community / administration|noun
great|of an impressive quality / large|adjective
green|of the color between blue and yellow / environmentally friendly|adjective
ground|the solid surface of the earth / basis|noun
group|a number of people or things that are located together / a set|noun
grow|to increase in size / to cultivate|verb
growth|the process of increasing in size / development|noun
guess|to estimate or conclude without sufficient information / a conjecture|verb/noun
gun|a weapon that fires bullets / to shoot|noun/verb
guy|a man or boy / a fellow|noun
hair|the threads growing from the skin of mammals / a strand|noun
half|one of two equal parts / partial|noun/adjective
hand|the end of the arm beyond the wrist / to give|noun/verb
hang|to suspend something from above / to wait|verb
happen|to take place or occur / to occur by chance|verb
happy|feeling or showing pleasure / content|adjective
hard|solid and firm to the touch / difficult|adjective
have|to possess or own something / to experience|verb
he|used to refer to a male person or animal|pronoun
head|the upper part of the human body / to lead|noun/verb
health|the state of being free from illness / well-being|noun
hear|to perceive sound with the ear / to listen|verb
heart|a muscular organ that pumps blood / the center of emotion|noun
heat|thermal energy / intensity|noun
heavy|of great weight / serious|adjective
help|to make it easier for someone to do something / assistance|verb/noun
her|used to refer to a female person or animal|pronoun
here|in this place / now|adverb
herself|used as the object of a verb or preposition to refer to a female|pronoun
high|at a great distance above the ground / elevated|adjective
him|used to refer to a male person or animal|pronoun
himself|used as the object of a verb or preposition to refer to a male|pronoun
his|belonging to or associated with a male person or animal|pronoun
history|the study of past events / a record of events|noun
hit|to strike something forcibly / a success|verb/noun
hold|to grasp or carry something / to restrain|verb
home|a place where one lives / a base|noun
hope|to desire something with expectation of fulfillment / optimism|verb/noun
hospital|a place where sick or injured people are treated / care facility|noun
hot|of high temperature / spicy|adjective
hotel|a building where travelers can stay / lodging|noun
hour|a period of 60 minutes / time|noun
house|a building for human habitation / to shelter|noun/verb
how|in what way or manner / to what extent|adverb
however|in whatever way / nevertheless|adverb/conjunction
html|hypertext markup language, used in web development to get website structure|noun
huge|very large / enormous|adjective
human|of or relating to people / a person|adjective/noun
hundred|the number 100 / a large number|noun
husband|a married man / to manage resources|noun/verb
I|used to refer to oneself|pronoun
idea|a thought or suggestion / a concept|noun
identify|to establish or indicate who or what someone or something is / to recognize|verb
if|on the condition that / whether|conjunction
image|a representation of the external form of a person or thing / reputation|noun
imagine|to form a mental image of something / to suppose|verb
impact|a physical collision / influence|noun/verb
important|of great significance / influential|adjective
improve|to make or become better / to enhance|verb
in|used to indicate location / during|preposition
include|to contain as part of a whole / to comprise|verb
including|containing as part of a whole / encompassing|preposition
increase|to become or make greater in size or amount / growth|verb/noun
indeed|in fact; really / truly|adverb
indicate|to point out or show / to suggest|verb
individual|a single human being / distinct|noun/adjective
industry|economic activity concerned with manufacturing / diligence|noun
information|facts provided or learned about something / data|noun
inside|on or within the inner side or surface of something / internal|preposition/adjective
instead|in place of / as an alternative|adverb
institution|an organization or establishment / a custom|noun
interest|a feeling of curiosity or concern about something / a financial return|noun
interesting|holding or catching one’s attention / engaging|adjective
international|involving two or more nations / global|adjective
interview|a meeting to assess suitability / a conversation|noun/verb
into|expressing movement or action toward the inside of something / to become|preposition
investment|the action or process of investing money / commitment|noun
involve|to include or engage as a necessary part / to entail|verb
issue|a matter or question to be discussed / to distribute|noun/verb
it|used to refer to a thing previously mentioned / a situation|pronoun
item|a single article or object / a point|noun
its|belonging to or associated with a thing previously mentioned|pronoun
itself|used as the object of a verb or preposition to refer to a thing|pronoun
java|most populated island in indonesia / an oop programming language developed by james gosling using the JVM|noun
javascript|A programming language developed in 10 days made by brendan eich, sharing functional and oop concepts|noun
job|a paid position of employment / a task|noun
join|to link or connect / to become a member|verb
just|only or merely / fair|adverb/adjective
keep|to retain possession of / to maintain|verb
key|a device for operating a lock / crucial|noun/adjective
kid|a child / to tease|noun/verb
kill|to cause the death of / to destroy|verb
kind|a sort or category of thing / compassionate|noun/adjective
kitchen|a room or area where food is prepared / cooking area|noun
know|to be aware of through observation, inquiry, or information / to recognize|verb
knowledge|facts, information, and skills acquired through experience / awareness|noun
land|the solid part of the earth's surface / to arrive|noun/verb
language|the method of human communication / a system of symbols|noun
large|of considerable or relatively great size / abundant|adjective
last|coming after all others in time or order / final|adjective
late|occurring or done after the expected or usual time / tardy|adjective
later|at a time after the present or after a specified or implied time / subsequent|adverb
laugh|to make a sound expressing amusement / to ridicule|verb/noun
law|a system of rules recognized by a community / legal principle|noun
lawyer|a person who practices law / attorney|noun
lay|to put something down / to place|verb
lead|to guide or direct / a heavy metal|verb/noun
leader|a person who leads / a head|noun
learn|to gain knowledge or skill / to find out|verb
least|the smallest in size, amount, or degree / minimum|adjective
leave|to go away from / to allow to remain|verb
left|on or toward the side of the body that is nearer to the heart / departed|adjective/verb
leg|a limb of the body used for standing or walking / a part of a journey|noun
legal|relating to the law / lawful|adjective
less|a smaller amount of / not as much|determiner/adverb
let|to allow or permit / to rent|verb
letter|a written or printed message / a character of the alphabet|noun
level|a position on a scale / flat|noun/adjective
lie|to recline / to make an untrue statement|verb
life|the condition that distinguishes animals and plants from inorganic matter / existence|noun
light|the natural agent that stimulates sight / not heavy|noun/adjective
like|similar to / to enjoy|preposition/verb
likely|probable / believable|adjective
line|a long thin mark / a queue|noun
linux|a monolithic kernel developed by torvalds in the 90s, BASH is its shell lang|noun
list|a series of names or items / to enroll|noun/verb
listen|to pay attention to sound / to heed|verb
little|small in size or amount / not much|adjective/adverb
live|to be alive / to reside|verb
local|of or relating to a particular area / a resident|adjective/noun
long|measuring a great distance / lasting for a considerable time|adjective
look|to direct one’s gaze / to appear|verb
lose|to fail to keep or maintain / to misplace|verb
loss|the fact or process of losing something / defeat|noun
lot|a large number or amount / a plot of land|noun
love|an intense feeling of deep affection / to like|noun/verb
low|not high or tall / depressed|adjective
machine|a device with moving parts that performs a task / a mechanism|noun
macintosh|an operating system developed by apple so the average user could use a computer without the terminal of the era|noun
magazine|a publication with articles and pictures / a storage place|noun
main|most important / principal|adjective
maintain|to cause or enable to continue / to support|verb
major|greater in size, quantity, or importance / a military rank|adjective/noun
majority|the greater number | most|noun
make|to cause to exist or happen / to construct|verb
man|an adult male human being / a person|noun
manage|to be in charge of / to succeed in doing|verb
management|the process of dealing with or controlling things / administration|noun
manager|a person who manages / a director|noun
many|a large number of / much|determiner
market|a place where goods are sold / demand|noun
marriage|the legally or formally recognized union of two people / wedlock|noun
material|a substance used to make something / relevant facts|noun
matter|a subject of discussion / physical substance|noun
may|used to express possibility / to be allowed|modal verb
maybe|possibly / perhaps|adverb
me|used to refer to oneself as the object of a verb or preposition|pronoun
mean|to intend to convey / to signify|verb
measure|a unit or standard of measurement / to determine size|noun/verb
media|the main means of mass communication / plural of medium|noun
medical|relating to the science or practice of medicine / clinical|adjective
meet|to come together / to satisfy|verb
meeting|a gathering for discussion / an encounter|noun
member|a person belonging to a group / a part|noun
memory|the faculty of remembering / a recollection|noun
mention|to refer to something briefly / to name|verb/noun
message|a communication sent or received / an instruction|noun
method|a particular way of doing something / technique|noun
middle|the center or midpoint of something / intermediate|noun/adjective
might|used to express possibility / strength|modal verb/noun
military|relating to armed forces / soldiers|adjective/noun
million|a number equal to one thousand thousand / a very large number|noun
mind|the element of a person that enables them to think / to object|noun/verb
minute|a unit of time equal to 60 seconds / very small|noun/adjective
miss|to fail to hit or catch / to feel the absence of|verb
mission|an important assignment or task / a religious outpost|noun
model|a representation of something / a person who poses|noun/verb
modern|relating to the present or recent times / contemporary|adjective
moment|a very brief period of time / a critical point|noun
money|a medium of exchange / wealth|noun
month|a period of approximately 30 days / lunar cycle|noun
more|a greater amount or number / additional|determiner/adverb
morning|the early part of the day / dawn|noun
most|the greatest amount or number / majority|determiner
mother|a female parent / originator|noun
mouth|the opening in the face for eating and speaking / entrance|noun
move|to change position or location / to touch emotionally|verb
movement|a series of actions or motions / a group with a shared goal|noun
movie|a motion picture / film|noun
Mr|a title used before a man’s name / sir|noun
Mrs|a title used before a married woman’s name / madam|noun
much|a large amount or degree / many|determiner/adverb
music|vocal or instrumental sounds combined in a harmonious whole / melody|noun
must|used to express necessity / obligation|modal verb
my|belonging to me / mine|pronoun
myself|used as the object of a verb or preposition to refer to oneself|pronoun
mysterious|full of, characterized by, or involving mystery|adjective
name|a word or set of words by which a person is known / to identify|noun/verb
nation|a large body of people united by common descent / country|noun
national|relating to a nation / citizen|adjective/noun
natural|existing in or derived from nature / innate|adjective
nature|the physical world / inherent character|noun
near|at or to a short distance away / close|adjective/adverb
nearly|almost / very close to|adverb
necessary|required to be done / essential|adjective
need|a requirement or necessity / to require|noun/verb
neovim|a modern text editor improving vim in many ways|noun
network|a system of interconnected people or things / a broadcasting system|noun
never|at no time in the past or future / not ever|adverb
new|not existing before / recently made|adjective
news|information about recent events / reports|noun
newspaper|a printed publication of news / periodical|noun
next|immediately following in time or place / subsequent|adjective
nice|pleasant or attractive / agreeable|adjective
night|the period of darkness in each twenty-four hours / evening|noun
no|not any / not|determiner/adverb
none|not any / no one|pronoun
nor|and not / neither|conjunction
north|the direction toward which the top of a map points / northern region|noun
not|used to negate verbs / no|adverb
note|a brief record of information / a musical tone|noun/verb
nothing|not anything / no thing|pronoun
notice|a notification or announcement / attention|noun/verb
now|at the present time / immediately|adverb
n't|contraction of 'not'|particle
number|a mathematical object used to count / a quantity|noun
occur|to happen or take place / to exist|verb
of|indicating origin, connection, or possession / belonging to|preposition
off|away from / not operating|preposition/adverb
offer|to present for acceptance / a proposal|verb/noun
office|a room or building where business is conducted / a position of authority|noun
officer|a person holding a position of authority / a police officer|noun
official|authorized to act for a government or other body / formal|adjective/noun
often|many times at short intervals / frequently|adverb
oh|used to express surprise or emotion / an interjection|interjection
oil|a viscous liquid derived from petroleum / to lubricate|noun/verb
ok|used to express agreement or acceptance / alright|interjection/adjective
old|having lived or existed for a long time / former|adjective
on|indicating the surface or position of something / operating|preposition
once|one time / formerly|adverb
one|a single person or thing / a unit|determiner/noun
only|solely / exclusively|adverb
onto|on to / to a position on|preposition
open|not closed or blocked / accessible|adjective/verb
operation|a procedure or process / a military action|noun
operating system|a technology that lets the user interact with a computer|noun
opportunity|a set of circumstances that makes it possible to do something / chance|noun
option|a thing that is or may be chosen / choice|noun
or|used to link alternatives / otherwise|conjunction
order|an arrangement or sequence / a command|noun/verb
organization|an organized body of people / structure|noun
other|different or distinct from one already mentioned / additional|adjective
others|people or things apart from those already mentioned / extra|pronoun
our|belonging to us / ours|pronoun
out|moving or extending away from a place / not in|adverb
outside|on or to the outer side or surface of something / external|preposition/adjective
over|above or across something / more than|preposition/adverb
own|belonging to or associated with a specified person / to possess|adjective/verb
owner|a person who owns something / possessor|noun
page|one side of a sheet of paper in a book / to turn to a page|noun/verb
pain|physical suffering / emotional distress|noun
painting|a picture made with paint / the art of painting|noun
paper|material made from cellulose pulp / a newspaper|noun
parent|a father or mother / a source|noun
part|a piece or segment of something / a role|noun
participant|a person who takes part in something / a member|noun
particular|specific or individual / exacting|adjective
particularly|especially / notably|adverb
partner|a person associated with another in a business / a spouse|noun
party|a social gathering / a political group|noun
pass|to move or extend / to succeed|verb
past|a time before now / previous|adjective/noun
patient|a person receiving medical treatment / tolerant|noun/adjective
pattern|a repeated decorative design / a model|noun
pay|to give money in exchange for goods or services / to settle|verb
peace|a state of tranquility / harmony|noun
people|human beings in general / a nation|noun
per|for each / in proportion to|preposition
perform|to carry out an action / to act|verb
performance|the action of performing / a show|noun
perhaps|possibly / maybe|adverb
period|a length of time / a full stop|noun
person|a human being / an individual|noun
personal|relating to a particular person / private|adjective
phone|a device for speech communication / to call|noun/verb
physical|relating to the body or material things / tangible|adjective
pick|to choose / to pluck|verb
picture|a visual representation / an image|noun
piece|a portion or fragment of something / a work of art|noun
place|a particular position or point in space / to put|noun/verb
plan|a detailed proposal for doing something / to intend|noun/verb
plant|a living organism that grows in the earth / a factory|noun
play|to engage in recreation / to perform|verb
player|a person who plays a game / a performer|noun
PM|post meridiem / after noon|abbreviation
point|a sharp end / a particular place|noun
police|the civil force of a state / law enforcement|noun
policy|a course or principle of action / insurance|noun
political|relating to government or public affairs / partisan|adjective
politics|the activities associated with governance / strategy|noun
poor|lacking sufficient money / inferior|adjective
popular|liked or enjoyed by many people / common|adjective
population|the inhabitants of a particular place / a group|noun
position|a place where someone or something is located / a job|noun
positive|confidently affirmative / favorable|adjective
possible|able to be done / feasible|adjective
power|the ability to do something / authority|noun
practice|the actual application of an idea / rehearsal|noun
prepare|to make ready / to train|verb
present|existing or occurring now / a gift|adjective/noun
president|the leader of a country or organization / a chief executive|noun
pressure|continuous physical force / stress|noun
pretty|attractive / quite|adjective/adverb
prevent|to stop something from happening / to hinder|verb
price|the amount of money expected, required, or given in payment / cost|noun
private|belonging to or for the use of one person / personal|adjective
probably|in all likelihood / likely|adverb
problem|a matter or situation regarded as unwelcome / difficulty|noun
process|a series of actions or steps / to handle|noun/verb
produce|to bring forth / to manufacture|verb
product|a thing produced by labor / result|noun
production|the action of producing / a play|noun
professional|engaging in a specified activity as one's main paid occupation / expert|adjective/noun
professor|a teacher of the highest rank / an academic|noun
program|a plan or system / software|noun
project|an individual or collaborative enterprise / to throw|noun/verb
property|a thing or things owned / real estate|noun
protect|to keep safe from harm / to defend|verb
prove|to demonstrate the truth of / to test|verb
provide|to supply / to make available|verb
public|of or relating to the people as a whole / open|adjective
pull|to exert force to move something / to extract|verb
purpose|the reason for which something is done / intention|noun
push|to apply force to move something / to urge|verb
put|to place or set something down / to express|verb
python|old world boas constrictors / open sourced programming lang|noun
quality|the standard of something as measured against other things / excellence|noun
question|a sentence worded or expressed so as to elicit information / doubt|noun/verb
quickly|at high speed / rapidly|adverb
quite|to a certain degree / completely|adverb
race|a competition of speed / a group of people sharing common ancestry|noun
radio|a device for receiving audio broadcasts / to communicate by radio|noun/verb
raise|to lift or move to a higher position / to increase|verb
range|a variety of different things / a distance|noun
rate|a measure or quantity relative to another / speed|noun/verb
rather|preferably / somewhat|adverb
reach|to stretch out one's hand / to arrive|verb
read|to look at and comprehend written or printed matter / to interpret|verb
ready|prepared or willing to do something / set|adjective
real|actually existing / genuine|adjective
reality|the state of things as they actually exist / actuality|noun
realize|to become fully aware of something / to achieve|verb
really|in truth / genuinely|adverb
reason|a cause or explanation / to think logically|noun/verb
receive|to be given, presented with, or paid something / to accept|verb
recent|having happened or started not long ago / current|adjective
recently|not long ago / lately|adverb
recognize|to identify someone or something previously known / to acknowledge|verb
record|an account of something / a disc for music|noun/verb
red|of the color of blood / political radical|adjective
reduce|to make smaller or less / to lower|verb
reflect|to think deeply / to bounce back|verb
region|a geographical area / a part of the body|noun
relate|to tell or narrate / to have connection|verb
relationship|the way in which two or more people or things are connected / bond|noun
religious|relating to religion / devout|adjective
remain|to continue to exist / to stay|verb
remember|to recall to the mind / to keep in mind|verb
remove|to take away or off / to eliminate|verb
report|an account or statement describing an event / to inform|noun/verb
represent|to be a delegate or spokesperson for / to depict|verb
Republican|a member of the Republican Party / a supporter of a republic|noun
require|to need for a particular purpose / to demand|verb
research|the systematic investigation into a subject / study|noun/verb
resource|a stock or supply of materials or assets / a means to an end|noun
respond|to say or write something in reply / to react|verb
response|a reaction or answer / reply|noun
responsibility|the state of being responsible / duty|noun
rest|a period of relaxation / to lean|noun/verb
result|a consequence or outcome / to follow|noun/verb
return|to come or go back / to send back|verb/noun
reveal|to make known / to disclose|verb
rich|having a great deal of money / abundant|adjective
right|morally correct / correct|adjective
rise|to move upward / to increase|verb
risk|a possibility of something bad happening / danger|noun
road|a wide way leading from one place to another / route|noun
rock|a hard mineral material / to sway|noun/verb
role|the function assumed or part played by a person / character|noun
room|a space enclosed by walls / space|noun
rule|a principle or regulation / to govern|noun/verb
run|to move quickly on foot / to operate|verb
safe|protected from danger / secure|adjective
same|identical to something else / the identical|adjective
save|to keep safe or preserve / to store|verb
say|to utter words / to express|verb
scene|a view or setting / a part of a play|noun
school|an institution for educating children / a group of fish|noun
science|the intellectual and practical activity encompassing the systematic study of the structure / knowledge|noun
scientist|a person who is studying or has expert knowledge of a science / researcher|noun
score|a number of points in a game / to achieve|noun/verb
sea|the expanse of salt water surrounding the continents / ocean|noun
season|a period of the year / to add flavor|noun/verb
seat|a place to sit / to install|noun/verb
second|coming after the first / a unit of time|adjective/noun
section|a distinct part or segment of something / division|noun
security|the state of being free from danger / protection|noun
see|to perceive with the eyes / to understand|verb
seek|to attempt to find / to search|verb
seem|to appear to be the case / to look|verb
sell|to exchange for money / to promote|verb
send|to cause to go or be taken to a particular destination / to transmit|verb
senior|of high rank or importance / older|adjective
sense|a faculty by which the body perceives an external stimulus / meaning|noun
series|a number of things that are connected / sequence|noun
serious|requiring thought or attention / grave|adjective
serve|to perform duties or services for / to provide|verb
service|the action of helping or doing work for someone / assistance|noun
set|to put in a specified place / a collection|verb/noun
seven|the number 7|noun
several|more than two but not many / various|determiner
sex|either of the two main categories into which humans and many other living things are divided / sexual activity|noun
sexual|relating to sex / erotic|adjective
shake|to move with short, rapid movements / to mix|verb
share|to have or use something at the same time as someone else / portion|verb/noun
she|used to refer to a female person or animal|pronoun
shoot|to fire a gun / to take a photograph|verb
short|having little length or height / brief|adjective
shot|a chance or attempt / a photograph|noun
should|used to indicate obligation or expectation / to be supposed to|modal verb
shoulder|the part of the body where the arm is attached / to carry|noun/verb
show|to display or exhibit / to demonstrate|verb/noun
side|a surface or aspect of an object / a position|noun
sign|a notice or placard / to write one’s name|noun/verb
significant|sufficiently great to be worthy of attention / meaningful|adjective
similar|alike in quality or appearance / comparable|adjective
simple|easily understood or done / not complex|adjective
simply|in a straightforward manner / merely|adverb
since|from a specified time in the past / because|conjunction/adverb
sing|to produce musical sounds with the voice / to celebrate|verb
single|not married / one only|adjective
sister|a female sibling / a member of a religious order|noun
sit|to rest on one’s buttocks / to be located|verb
site|a place where something is located / a website|noun
situation|a set of circumstances / a position|noun
six|the number 6|noun
size|the relative extent of something / dimensions|noun
skill|the ability to do something well / expertise|noun
skin|the soft outer covering of the body / to peel|noun/verb
small|of a size that is less than normal / insignificant|adjective
smile|a facial expression indicating pleasure / to grin|noun/verb
so|in order that / to such a degree|conjunction/adverb
social|relating to society or its organization / sociable|adjective
society|a community of people living in a particular country or region / a group|noun
soldier|a person who serves in an army / a fighter|noun
some|an unspecified amount or number / a few|determiner
somebody|a person of importance or distinction / someone|pronoun
someone|an unspecified individual / a person|pronoun
something|a thing that is not known or specified / a matter|pronoun
sometimes|at certain times / occasionally|adverb
son|a male child / a male descendant|noun
song|a short musical composition / a lyric|noun
soon|before long / quickly|adverb
sort|a category or type / to arrange|noun/verb
sound|vibrations that travel through the air / healthy|noun/adjective
source|a place from which something comes / origin|noun
south|the direction toward which the bottom of a map points / southern region|noun
southern|relating to the south / from the south|adjective
space|the unlimited expanse in which everything is located / room|noun
speak|to say something / to talk|verb
special|better, greater, or otherwise different from what is usual / particular|adjective
specific|clearly defined or identified / particular|adjective
speech|the expression of thoughts in spoken words / a formal address|noun
spend|to use money for a particular purpose / to pass time|verb
sport|an activity involving physical exertion and skill / recreation|noun
spring|the season between winter and summer / to jump|noun/verb
staff|employees of an organization / a stick|noun
stage|a raised platform for performances / a phase|noun
stand|to be in an upright position / to tolerate|verb
standard|a level of quality or attainment / a benchmark|noun
star|a fixed luminous point in the sky / a celebrity|noun
start|to begin / to initiate|verb
state|the particular condition that someone or something is in / a political entity|noun
statement|a definite or clear expression of something / declaration|noun
station|a place where trains stop / a base|noun
stay|to remain in a place / to endure|verb
step|a movement of the foot / a stage|noun/verb
still|remaining in a specified state / quiet|adjective/adverb
stock|the supply of goods or materials / shares|noun
stop|to cease moving or acting / a halt|verb/noun
store|a place where goods are sold / to keep|noun/verb
story|a narrative / a level of a building|noun
strategy|a plan of action / tactic|noun
street|a public road in a city or town / avenue|noun
strong|having great physical power / robust|adjective
structure|the arrangement of parts / a building|noun
student|a person who is studying / a learner|noun
study|the devotion of time and attention to acquiring knowledge / research|noun/verb
stuff|material or substance / to fill|noun/verb
style|a particular way in which something is done / fashion|noun
subject|a topic of conversation or study / a person under authority|noun
success|the accomplishment of an aim / achievement|noun
successful|having achieved one’s aim / prosperous|adjective
such|of the kind described / so|determiner
suddenly|happening or done in a short time / abruptly|adverb
suffer|to experience pain or distress / to endure|verb
suggest|to put forward for consideration / to imply|verb
summer|the warmest season of the year / vacation|noun
support|to bear all or part of the weight of / to back|verb/noun
sure|certain or confident / definite|adjective
surface|the outside part or uppermost layer of something / to emerge|noun/verb
system|a set of things working together as parts of a mechanism / method|noun
table|a piece of furniture with a flat top / to postpone|noun/verb
take|to carry or move something / to accept|verb
talk|to speak with someone / conversation|verb/noun
task|a piece of work to be done / duty|noun
tax|a sum of money demanded by a state / to impose a tax|noun/verb
teach|to impart knowledge or skill / to instruct|verb
teacher|a person who teaches / instructor|noun
team|a group of players or workers / a unit|noun
technology|the application of scientific knowledge for practical purposes / innovation|noun
television|a system for transmitting visual images / TV|noun
tell|to inform someone / to narrate|verb
ten|the number 10|noun
tend|to be inclined to do something / to care for|verb
term|a word or phrase used to describe something / a period of time|noun
test|a procedure intended to establish the quality of something / examination|noun/verb
than|used to introduce the second element in a comparison / compared to|conjunction
thank|to express gratitude / to acknowledge|verb
that|used to identify a specific person or thing / so|determiner/adverb
the|used to refer to a specific person or thing / definite article|article
their|belonging to or associated with them|pronoun
them|used to refer to them as the object of a verb or preposition|pronoun
themselves|used as the object of a verb or preposition to refer to them|pronoun
then|at that time / next|adverb
theory|a supposition or system of ideas intended to explain something / hypothesis|noun
there|in, at, or to that place / existence|adverb
these|used to refer to specific people or things / plural of this|determiner
they|used to refer to them as the subject of a verb / persons|pronoun
thing|an object or entity / matter|noun
think|to have a particular idea or belief / to consider|verb
third|coming after the second / one of three equal parts|adjective
this|used to identify a specific person or thing / near|determiner
those|used to refer to specific people or things / plural of that|determiner
though|used to introduce a statement contrasting with what has been said / although|conjunction
thought|an idea or opinion / reflection|noun
thousand|the number 1000 / a large number|noun
threat|a statement of an intention to inflict pain / danger|noun
three|the number 3|noun
through|moving in one side and out of the other / by means of|preposition
throughout|in every part of / during the whole of|preposition
throw|to propel something through the air / to cast|verb
thus|in this way / therefore|adverb
time|the indefinite continued progress of existence / a point in time|noun
to|indicating direction or motion toward a place / up to|preposition
today|on this day / now|adverb
together|with one another / in unison|adverb
tonight|on this night / this evening|adverb
too|also / excessively|adverb
top|the highest point or part of something / to surpass|noun/verb
total|constituting the whole / complete|adjective/noun
tough|strong and durable / difficult|adjective
toward|in the direction of / approaching|preposition
town|a human settlement larger than a village / community|noun
trade|the action of buying and selling goods / commerce|noun
traditional|existing in or as part of a tradition / customary|adjective
training|the action of teaching or learning a skill / instruction|noun
travel|to make a journey / to move|verb/noun
treat|to deal with in a specified way / to entertain|verb
treatment|the process of receiving medical care / management|noun
tree|a woody perennial plant / a family tree|noun
trial|a formal examination of evidence / test|noun
trip|a journey / a stumble|noun/verb
trouble|a difficulty or problem / to disturb|noun/verb
true|in accordance with fact or reality / genuine|adjective
truth|the quality of being true / reality|noun
try|to attempt / to test|verb
turn|to rotate or change direction / a move|verb/noun
TV|television / a television set|abbreviation
two|the number 2|noun
type|a category of people or things / to write|noun/verb
typescript|a strongly typed, object-oriented programming language that serves as a syntactic superset of javascript, adding static typing|noun
under|beneath or below / subject to|preposition
understand|to perceive the intended meaning of / to comprehend|verb
unit|a single thing or person / a group|noun
until|up to the time of / before|preposition
up|in or to a higher position / awake|adverb
upon|on / at the time of|preposition
us|used to refer to ourselves as the object of a verb or preposition|pronoun
use|to employ for a purpose / to consume|verb/noun
usually|typically / generally|adverb
value|the worth of something / importance|noun
various|of different kinds / diverse|adjective
very|to a great extent / extremely|adverb
victim|a person who is harmed or killed / sufferer|noun
view|the ability to see something / opinion|noun
vim|a text based editor that improves Vi|noun
violence|behavior involving physical force / aggression|noun
visit|to go to see a person or place / a trip|verb/noun
visual studio code|most commonly used IDE, gui-based, mouse-centric|noun
voice|the sound produced in a person’s larynx / expression|noun
vote|a formal expression of choice / to elect|verb/noun
wait|to remain in a place until something happens / to postpone|verb
walk|to move at a regular pace by lifting and setting down each foot / a stroll|verb/noun
wall|a continuous vertical brick or stone structure / barrier|noun
want|to desire or wish for something / to lack|verb
war|a state of armed conflict between nations / battle|noun
watch|to look at attentively / to observe|verb/noun
water|a colorless, transparent, odorless liquid / to irrigate|noun/verb
way|a method or manner of doing something / a road|noun
we|used to refer to ourselves as the subject of a verb / us|pronoun
weapon|a tool or instrument used to inflict harm / arm|noun
wear|to have clothing on / to erode|verb
week|a period of seven days / a work week|noun
weight|a measure of how heavy something is / burden|noun
well|in a good or satisfactory way / a source of water|adverb/noun
west|the direction toward which the sun sets / western region|noun
western|relating to the west / from the west|adjective
what|used to ask for information about something / which thing|determiner
whatever|no matter what / anything|determiner
when|at what time / at the time that|adverb/conjunction
where|at or in what place / to what place|adverb
whether|expressing a doubt or choice between alternatives / if|conjunction
which|used to ask for information about something / that|determiner
while|during the time that / whereas|conjunction
white|of the color of snow / pale|adjective
who|used to refer to a person / someone|pronoun
whole|entire / complete|adjective
whom|used to refer to a person as the object of a verb or preposition / who|pronoun
whose|belonging to or associated with a person or thing / of whom|pronoun
why|for what reason / because|adverb
wide|covering a large area / broad|adjective
wife|a married woman / spouse|noun
will|used to express future actions / determination|modal verb/noun
win|to achieve victory in a contest or conflict / to succeed|verb
wind|the movement of air / to twist|noun/verb
window|an opening in a wall to admit light and air / a period of time|noun
windows|an operating system developed by microsoft used by most|noun
wish|a desire or hope / to want|noun/verb
with|accompanying / having|preposition
within|inside or not beyond / during|preposition
without|not having or possessing / lacking|preposition
woman|an adult female human being / a girl|noun
wonder|a feeling of surprise or admiration / to be curious|noun/verb
word|a single distinct meaningful element of speech or writing / promise|noun
work|activity involving mental or physical effort / job|noun/verb
worker|a person who works / laborer|noun
world|the earth with its inhabitants / the universe|noun
worry|a state of anxiety or concern / to distress|noun/verb
would|used to express a conditional or hypothetical situation / to be willing|modal verb
write|to mark letters, words, or symbols on a surface / to compose|verb
writer|a person who writes / author|noun
wrong|not correct / immoral|adjective
yard|a unit of length / an enclosed area|noun
yeah|used to express agreement or confirmation / yes|interjection
year|a period of twelve months / annual|noun
yes|used to give an affirmative reply / certainly|adverb
yet|up to the present time / still|adverb
you|used to refer to the person or people addressed / oneself|pronoun
young|not old / youthful|adjective
your|belonging to you / yours|pronoun
yourself|used as the object of a verb or preposition to refer to you|pronoun
water|a colorless, transparent, odorless liquid / to irrigate|noun/verb|水 (みず)|el agua|水
`;


// ── Build word list ──────────────────────────────────────────
let allWords = [];

function setupDict() {
  const lines = wordsText.trim().split('\n');
  lines.forEach(line => {
    const parts = line.split('|');
    if (parts.length >= 3) {
      allWords.push(new Word(
        parts[0].trim(), parts[1].trim(), parts[2].trim(),
        (parts[3] || '').trim(), (parts[4] || '').trim(), (parts[5] || '').trim()
      ));
    }
  });
  console.log(`✅ Dictionary loaded: ${allWords.length} words`);
}

// ── Active POS filter ────────────────────────────────────────
let activePOS = 'all';

document.getElementById('posFilter').addEventListener('click', e => {
  const btn = e.target.closest('.pos-btn');
  if (!btn) return;
  document.querySelectorAll('.pos-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activePOS = btn.dataset.pos;
  showResults(document.getElementById('searchInput').value);
});

// ── Ranked search logic ──────────────────────────────────────
/**
 * Tier 0 — exact match on word name
 * Tier 1 — name starts with query
 * Tier 2 — name contains query
 * Tier 3 — definition contains query (loose)
 */
function rankedSearch(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const scored = [];

  for (const word of allWords) {
    if (activePOS !== 'all' && word.posCategory !== activePOS) continue;

    const name = word.name.toLowerCase();
    const defn = word.definition.toLowerCase();
    let tier = null;

    if (name === q)            tier = 0;
    else if (name.startsWith(q)) tier = 1;
    else if (name.includes(q))   tier = 2;
    else if (defn.includes(q))   tier = 3;

    if (tier !== null) scored.push({ word, tier });
  }

  scored.sort((a, b) => a.tier - b.tier);
  return scored.map(s => s.word);
}

// ── Keyboard nav state ───────────────────────────────────────
let selectedIndex  = -1;
let currentMatches = [];

function renderResults(matches) {
  currentMatches = matches;
  selectedIndex  = -1;

  const results = document.getElementById('results');
  results.innerHTML = '';
  if (!matches.length) return;

  matches.forEach((word, i) => {
    const div = document.createElement('div');
    div.className   = 'result-item';
    div.role        = 'option';
    div.dataset.idx = i;

    const badge = document.createElement('span');
    badge.className   = 'result-pos';
    badge.textContent = word.posCategory;

    const label = document.createElement('span');
    label.className = 'result-label';
    label.innerHTML = `<strong>${word.name}</strong>`;

    const def = document.createElement('span');
    def.className   = 'result-def';
    def.textContent = word.definition;

    div.appendChild(badge);
    div.appendChild(label);
    div.appendChild(def);

    // Click: auto-search immediately, no second Enter needed
    div.addEventListener('mousedown', e => {
      e.preventDefault();
      selectResult(i);
    });

    results.appendChild(div);
  });
}

function selectResult(idx) {
  const word = currentMatches[idx];
  if (!word) return;
  document.getElementById('searchInput').value = word.name;
  document.getElementById('results').innerHTML = '';
  currentMatches = [];
  selectedIndex  = -1;
  displayWord(word);
}

function highlightResult(idx) {
  const items = document.querySelectorAll('.result-item');
  items.forEach((el, i) => el.classList.toggle('highlighted', i === idx));
  if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
}

// ── Live results ─────────────────────────────────────────────
function showResults(query) {
  if (!query.trim()) {
    document.getElementById('results').innerHTML = '';
    currentMatches = [];
    return;
  }
  renderResults(rankedSearch(query).slice(0, 60));
}

// ── Helpers ──────────────────────────────────────────────────
function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatDefinition(raw) {
  const senses = raw.split(' / ').map(s => s.trim()).filter(Boolean);
  if (senses.length <= 1) return `<span>${escapeHTML(raw)}</span>`;
  const items = senses.map(s => `<li>${escapeHTML(s)}</li>`).join('');
  return `<ul class="def-list">${items}</ul>`;
}


// ── Full entry display ───────────────────────────────────────
function displayWord(word) {
  const output = document.getElementById('output');

  const posHTML = word.partOfSpeech.split('/').map(p =>
    `<span class="tag">${p.trim()}</span>`
  ).join('');

  const defHTML = formatDefinition(word.definition);

  output.innerHTML = `
    <div class="entry-card">
      <div class="entry-top">
        <span class="entry-word">${escapeHTML(word.name)}</span>
        <div class="entry-tags">${posHTML}</div>
      </div>
      <div class="entry-body">
        <div class="entry-row">
          <span class="entry-field-label" id="defLabel">Definition</span>
          <div class="entry-definition" id="defContent">${defHTML}</div>
        </div>
        <div class="translate-strip">
          <span class="translate-label">Translate:</span>
          <button class="translate-btn" id="translateBtn-es">🇪🇸 ES</button>
          <button class="translate-btn" id="translateBtn-ja">🇯🇵 JA</button>
          <button class="translate-btn" id="translateBtn-zh">🇨🇳 ZH</button>
          <button class="translate-btn translate-btn-reset" id="translateBtn-reset" style="display:none">↩ Original</button>
        </div>
      </div>
    </div>
  `;

  const originalDef = word.definition;

  function wireBtn(btnId, trans, langLabel) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    if (!trans) { btn.disabled = true; btn.title = 'No translation provided'; return; }
    btn.addEventListener('click', () => {
      const defContent = document.getElementById('defContent');
      const defLabel   = document.getElementById('defLabel');
      defContent.innerHTML = formatDefinition(trans);
      defLabel.textContent = langLabel;
      document.getElementById('translateBtn-reset').style.display = '';
    });
  }

  document.getElementById('translateBtn-reset').addEventListener('click', () => {
    document.getElementById('defContent').innerHTML = formatDefinition(originalDef);
    document.getElementById('defLabel').textContent = 'Definition';
    document.getElementById('translateBtn-reset').style.display = 'none';
    document.querySelectorAll('.translate-btn').forEach(b => {
      if (b.id !== 'translateBtn-reset') b.disabled = !b._hasTrans;
    });
  });

  wireBtn('translateBtn-es', word.transES, 'ES');
  wireBtn('translateBtn-ja', word.transJA, 'JA');
  wireBtn('translateBtn-zh', word.transZH, 'ZH');
  ['translateBtn-es','translateBtn-ja','translateBtn-zh'].forEach(id => {
    const b = document.getElementById(id); if (b) b._hasTrans = !b.disabled;
  });
}

function searchWord() {
  const input = document.getElementById('searchInput');
  const query = input.value.trim().toLowerCase();
  if (!query) return;

  document.getElementById('results').innerHTML = '';

  const matches = rankedSearch(query);
  if (matches.length) {
    displayWord(matches[0]);
  } else {
    document.getElementById('output').innerHTML =
      `<div class="output-placeholder not-found">"${input.value.trim()}" not found.</div>`;
  }
}

// ── Keyboard navigation ──────────────────────────────────────
document.addEventListener('keydown', e => {
  const hasResults = currentMatches.length > 0;

  if (e.key === 'ArrowDown' && hasResults) {
    e.preventDefault();
    selectedIndex = Math.min(selectedIndex + 1, currentMatches.length - 1);
    highlightResult(selectedIndex);
  } else if (e.key === 'ArrowUp' && hasResults) {
    e.preventDefault();
    selectedIndex = Math.max(selectedIndex - 1, 0);
    highlightResult(selectedIndex);
  } else if (e.key === 'Enter') {
    if (hasResults && selectedIndex >= 0) selectResult(selectedIndex);
    else searchWord();
  } else if (e.key === 'Escape') {
    document.getElementById('results').innerHTML = '';
    currentMatches = [];
    selectedIndex  = -1;
  }
});

// ── Init ─────────────────────────────────────────────────────
window.onload = () => {
  setupDict();
  const input = document.getElementById('searchInput');
  input.addEventListener('input', e => showResults(e.target.value));
};
