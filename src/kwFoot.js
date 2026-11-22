// คำไว — หมวดนักเตะแยกตามสโมสร (ทุกยุค ใครเคยเล่นให้ทีมนี้ก็นับ) บรรทัดละ 1 คน: "ชื่ออังกฤษ|ชื่อไทย|ชื่อเรียกอื่น"
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);

export const FOOT_PACKS = [
  { id: 'fmu', name: '🔴 นักเตะแมนยู', words: L(`
Cristiano Ronaldo|โรนัลโด้|คริสเตียโน่ โรนัลโด้|CR7
Wayne Rooney|รูนี่ย์|เวย์น รูนี่ย์
David Beckham|เบ็คแฮม
Ryan Giggs|กิ๊กส์
Paul Scholes|สโคลส์
Roy Keane|รอย คีน
Gary Neville|แกรี่ เนวิลล์|เนวิลล์
Phil Neville|ฟิล เนวิลล์
Eric Cantona|คันโตน่า
Peter Schmeichel|ชไมเคิล
Edwin van der Sar|ฟาน เดอร์ ซาร์
Rio Ferdinand|เฟอร์ดินานด์|ริโอ เฟอร์ดินานด์
Nemanja Vidic|วิดิช
Patrice Evra|เอวร้า
Ruud van Nistelrooy|ฟาน นิสเตลรอย|นิสเตลรอย
Dwight Yorke|ยอร์ค
Andy Cole|แอนดี้ โคล
Ole Gunnar Solskjaer|โซลชาร์|โอเล่
Teddy Sheringham|เชอริงแฮม
Michael Carrick|คาร์ริค
Park Ji-sung|ปาร์ค จี ซอง|ปาร์คจีซอง
Dimitar Berbatov|เบอร์บาตอฟ
Carlos Tevez|เตเวซ
Robin van Persie|ฟาน เพอร์ซี่
Javier Hernandez|ชิชาริโต้|Chicharito
Nani|นานี่
Antonio Valencia|บาเลนเซีย
David de Gea|เดเคอา|เด เคอา
Juan Mata|มาต้า
Ander Herrera|เอร์เรร่า
Paul Pogba|ป็อกบา
Zlatan Ibrahimovic|อิบราฮิโมวิช|ซลาตัน
Romelu Lukaku|ลูกากู
Marcus Rashford|แรชฟอร์ด
Anthony Martial|มาร์กซิยาล
Jesse Lingard|ลินการ์ด
Harry Maguire|แม็กไกวร์
Bruno Fernandes|บรูโน่|บรูโน่ แฟร์นันด์ส
Luke Shaw|ลุค ชอว์|ชอว์
Mason Greenwood|กรีนวู้ด
Casemiro|กาเซมิโร่
Lisandro Martinez|ลิซานโดร|ลิซานโดร มาร์ติเนซ
Raphael Varane|วาราน
Christian Eriksen|อีริคเซ่น
Antony|แอนโทนี่
Rasmus Hojlund|ฮอยลุนด์
Alejandro Garnacho|การ์นาโช่
Kobbie Mainoo|ไมนู
Andre Onana|โอนาน่า
Amad Diallo|อามาด
Diogo Dalot|ดาโลต์
Scott McTominay|แม็คโทมิเนย์
Fred|เฟร็ด
Bryan Robson|ไบรอัน ร็อบสัน
George Best|จอร์จ เบสต์
Bobby Charlton|บ็อบบี้ ชาร์ลตัน
Denis Law|เดนิส ลอว์
Mark Hughes|มาร์ค ฮิวจ์ส
Steve Bruce|สตีฟ บรูซ
Matheus Cunha|คุนญา
Bryan Mbeumo|เอ็มบึมโม่
Benjamin Sesko|เซสโก้
`) },
  { id: 'fliv', name: '🔴 นักเตะลิเวอร์พูล', words: L(`
Mohamed Salah|ซาลาห์|โม ซาลาห์
Steven Gerrard|เจอร์ราร์ด|สตีเว่น เจอร์ราร์ด
Jamie Carragher|คาร์ราเกอร์
Kenny Dalglish|ดัลกลิช|เคนนี่ ดัลกลิช
Ian Rush|เอียน รัช
John Barnes|จอห์น บาร์นส์
Robbie Fowler|ฟาวเลอร์
Michael Owen|โอเว่น|ไมเคิล โอเว่น
Steve McManaman|แม็คมานามาน
Jamie Redknapp|เร้ดแนปป์
Sami Hyypia|ฮิเปีย
Xabi Alonso|ชาบี อลอนโซ่|อลอนโซ่
Fernando Torres|ตอร์เรส
Luis Suarez|ซัวเรซ
Javier Mascherano|มาสเคราโน่
Pepe Reina|เรน่า
Dirk Kuyt|เคาท์
Philippe Coutinho|คูตินโญ่
Daniel Sturridge|สตาร์ริดจ์
Raheem Sterling|สเตอร์ลิ่ง
Jordan Henderson|เฮนเดอร์สัน
Roberto Firmino|เฟอร์มิโน่
Sadio Mane|มาเน่
Virgil van Dijk|ฟาน ไดค์|ฟานไดค์
Alisson Becker|อลิสซอน
Trent Alexander-Arnold|อเล็กซานเดอร์ อาร์โนลด์|เทรนต์
Andrew Robertson|โรเบิร์ตสัน
Fabinho|ฟาบินโญ่
Georginio Wijnaldum|ไวนัลดุม
James Milner|มิลเนอร์
Joel Matip|มาติป
Diogo Jota|โชต้า|ดีโอโก้ โชต้า
Thiago Alcantara|ติอาโก้
Luis Diaz|หลุยส์ ดิอาซ
Darwin Nunez|นูนเญซ|ดาร์วิน
Cody Gakpo|กัคโป
Alexis Mac Allister|แม็ค อัลลิสเตอร์|แม็คอัลลิสเตอร์
Dominik Szoboszlai|โซบอสซไล
Ryan Gravenberch|กราเวนเบิร์ช
Ibrahima Konate|โคนาเต้
Curtis Jones|เคอร์ติส โจนส์
Harvey Elliott|เอลเลียต
Florian Wirtz|เวิร์ตซ์
Alexander Isak|อิซัค
Hugo Ekitike|เอกิติเก้
Jeremie Frimpong|ฟริมปง
Milos Kerkez|เคอร์เคซ
Jerzy Dudek|ดูเด็ค
Emile Heskey|เฮสกี้
Peter Crouch|เคร้าช์|ปีเตอร์ เคร้าช์
Craig Bellamy|เบลลามี่
Lucas Leiva|ลูคัส เลวา
Daniel Agger|แอ็กเกอร์
Martin Skrtel|สเคอร์เทล
Graeme Souness|ซูเนสส์
`) },
  { id: 'fars', name: '🔴 นักเตะอาร์เซนอล', words: L(`
Thierry Henry|อองรี|เธียร์รี่ อองรี
Dennis Bergkamp|แบร์กแคมป์
Patrick Vieira|วิเอร่า
Robert Pires|ปิแรส
Freddie Ljungberg|ลุงเบิร์ก
Sol Campbell|ซอล แคมป์เบลล์
Ashley Cole|แอชลีย์ โคล
Tony Adams|โทนี่ อดัมส์
Ian Wright|เอียน ไรท์
David Seaman|ซีแมน
Jens Lehmann|เลห์มันน์
Kolo Toure|โคโล ตูเร่
Lauren|ลอเรน
Gilberto Silva|จิลแบร์โต้
Marc Overmars|โอเวอร์มาร์ส
Emmanuel Petit|เปอตีต์
Nwankwo Kanu|คานู
Nicolas Anelka|อเนลก้า
Cesc Fabregas|ฟาเบรกาส|เชส
Robin van Persie|ฟาน เพอร์ซี่
Theo Walcott|วัลค็อตต์
Samir Nasri|นาสรี่
Emmanuel Adebayor|อเดบายอร์
Andrey Arshavin|อาร์ชาวิน
Tomas Rosicky|โรซิคกี้
Jack Wilshere|วิลเชียร์
Aaron Ramsey|แรมซีย์
Santi Cazorla|คาซอร์ล่า
Mesut Ozil|โอซิล
Olivier Giroud|ชิรูด์|จิรูด์
Alexis Sanchez|อเล็กซิส ซานเชซ|ซานเชซ
Laurent Koscielny|คอสเซียลนี่
Per Mertesacker|แมร์เตซัคเกอร์
Petr Cech|ปีเตอร์ เช็ก
Pierre-Emerick Aubameyang|โอบาเมยอง
Alexandre Lacazette|ลากาแซตต์
Granit Xhaka|ชาก้า
Bukayo Saka|ซาก้า
Martin Odegaard|โอเดการ์ด
Gabriel Martinelli|มาร์ติเนลลี่
Gabriel Jesus|เชซุส|กาเบรียล เชซุส
Gabriel Magalhaes|กาเบรียล|กาเบรียล มากัลไฮส์
William Saliba|ซาลิบา
Ben White|เบน ไวท์
Declan Rice|ไรซ์|ดีแคลน ไรซ์
Kai Havertz|ฮาแวร์ตซ์
Thomas Partey|ปาร์เตย์
Aaron Ramsdale|แรมส์เดล
David Raya|รายา
Leandro Trossard|ทรอสซาร์
Jurrien Timber|ทิมเบอร์
Oleksandr Zinchenko|ซินเชนโก้
Takehiro Tomiyasu|โทมิยาสุ
Riccardo Calafiori|คาลาฟิโอรี่
Viktor Gyokeres|โยเคเรส|เยอเกเรส
Martin Zubimendi|ซูบิเมนดี้
Eberechi Eze|เอเซ่
Noni Madueke|มาดูเอเก้
Ethan Nwaneri|นวาเนรี่
Myles Lewis-Skelly|ลูอิส สเกลลี่
`) },
  { id: 'fche', name: '🔵 นักเตะเชลซี', words: L(`
Frank Lampard|แลมพาร์ด
John Terry|จอห์น เทอร์รี่|เทอร์รี่
Didier Drogba|ดร็อกบา
Petr Cech|ปีเตอร์ เช็ก
Ashley Cole|แอชลีย์ โคล
Claude Makelele|มาเกเลเล่
Michael Essien|เอสเซียง
Arjen Robben|ร็อบเบน
Damien Duff|ดัฟฟ์
Joe Cole|โจ โคล
Ricardo Carvalho|คาร์วัลโญ่
Michael Ballack|บัลลัค
Andriy Shevchenko|เชฟเชนโก้
Nicolas Anelka|อเนลก้า
Florent Malouda|มาลูด้า
Salomon Kalou|คาลู
Branislav Ivanovic|อิวาโนวิช
Juan Mata|มาต้า
Ramires|รามิเรส
Fernando Torres|ตอร์เรส
David Luiz|ดาวิด ลุยซ์
Gary Cahill|คาฮิลล์
Cesar Azpilicueta|อัซปิลิกวยต้า|อัซปี
Eden Hazard|อาซาร์
Oscar|ออสการ์
Willian|วิลเลียน
Nemanja Matic|มาติช
Diego Costa|ดิเอโก้ คอสต้า
Cesc Fabregas|ฟาเบรกาส
N'Golo Kante|ก็องเต้|คันเต้
Thibaut Courtois|กูร์ตัวส์
Pedro Rodriguez|เปโดร
Marcos Alonso|มาร์กอส อลอนโซ่
Victor Moses|โมเสส
Olivier Giroud|ชิรูด์|จิรูด์
Jorginho|จอร์จินโญ่
Mason Mount|เมาท์
Reece James|รีซ เจมส์
Ben Chilwell|ชิลเวลล์
Kai Havertz|ฮาแวร์ตซ์
Timo Werner|แวร์เนอร์
Christian Pulisic|พูลิซิช
Thiago Silva|ติอาโก้ ซิลวา
Edouard Mendy|เอดูอาร์ เมนดี้
Antonio Rudiger|รูดิเกอร์
Mateo Kovacic|โควาซิช
Romelu Lukaku|ลูกากู
Enzo Fernandez|เอ็นโซ่|เอ็นโซ่ แฟร์นันเดซ
Moises Caicedo|ไกเซโด้
Cole Palmer|พาลเมอร์|โคล พาลเมอร์
Nicolas Jackson|แจ็คสัน
Noni Madueke|มาดูเอเก้
Levi Colwill|โคลวิลล์
Robert Sanchez|โรเบิร์ต ซานเชซ
Joao Pedro|เชา เปโดร
Liam Delap|เดแลป
Pedro Neto|เปโดร เนโต้
Marc Cucurella|คูคูเรย่า
Gianfranco Zola|โซล่า
Dennis Wise|เดนนิส ไวส์
Marcel Desailly|เดอไซญี่
Jimmy Floyd Hasselbaink|ฮัสเซลเบงค์
`) },
  { id: 'fmc', name: '🩵 นักเตะแมนซิตี้', words: L(`
Sergio Aguero|อเกวโร่|คุน
David Silva|ดาบิด ซิลบา|ดาวิด ซิลวา
Vincent Kompany|กอมปานี
Yaya Toure|ยาย่า ตูเร่
Pablo Zabaleta|ซาบาเลต้า
Joe Hart|โจ ฮาร์ท
Carlos Tevez|เตเวซ
Edin Dzeko|เชโก้
Samir Nasri|นาสรี่
Mario Balotelli|บาโลเตลลี่
Kevin De Bruyne|เดอ บรอยน์|เควิน เดอ บรอยน์|KDB
Raheem Sterling|สเตอร์ลิ่ง
Leroy Sane|ซาเน่
Fernandinho|เฟร์นันดินโญ่
Bernardo Silva|แบร์นาร์โด้
Riyad Mahrez|มาห์เรซ
Gabriel Jesus|เชซุส
Ederson|เอแดร์ซอน
Kyle Walker|ไคล์ วอล์คเกอร์|วอล์คเกอร์
John Stones|สโตนส์
Aymeric Laporte|ลาปอร์ต
Ruben Dias|รูเบน ดิอาส
Rodri|โรดรี้
Ilkay Gundogan|กุนโดกัน
Phil Foden|โฟเด้น
Jack Grealish|กรีลิช
Erling Haaland|ฮาแลนด์|ฮาลันด์
Julian Alvarez|อัลวาเรซ
Manuel Akanji|อคันจี
Josko Gvardiol|กวาร์ดิโอล
Nathan Ake|อาเก้
Jeremy Doku|โดคู
Mateo Kovacic|โควาซิช
Rico Lewis|ริโก้ ลูอิส
Savinho|ซาวินโญ่
Omar Marmoush|มาร์มูช
Tijjani Reijnders|ไรจ์นเดอร์ส
Rayan Cherki|แชร์กี้
Gianluigi Donnarumma|ดอนนารุมม่า
Abdukodir Khusanov|คูซานอฟ
Shaun Wright-Phillips|ไรท์ ฟิลลิปส์
Gael Clichy|กลิชี่
Aleksandar Kolarov|โคลารอฟ
Micah Richards|ไมก้า ริชาร์ดส์
Joleon Lescott|เลสคอตต์
James Milner|มิลเนอร์
Nicolas Otamendi|โอตาเมนดี้
Oscar Bobb|บ็อบบ์
Matheus Nunes|มาเตอุส นูเนส
`) },
  { id: 'frm', name: '⚪ นักเตะเรอัล มาดริด', words: L(`
Cristiano Ronaldo|โรนัลโด้|คริสเตียโน่ โรนัลโด้|CR7
Zinedine Zidane|ซีดาน
Raul Gonzalez|ราอูล
Iker Casillas|คาซิยาส
Roberto Carlos|โรแบร์โต้ คาร์ลอส
Fernando Hierro|เอียร์โร่
Luis Figo|ฟิโก้
Ronaldo Nazario|โรนัลโด้ เนื้อทอง|โรนัลโด้ นาซาริโอ|R9
David Beckham|เบ็คแฮม
Michael Owen|ไมเคิล โอเว่น
Guti|กูตี้
Sergio Ramos|รามอส
Pepe|เปเป้
Marcelo|มาร์เซโล่
Xabi Alonso|ชาบี อลอนโซ่
Kaka|กาก้า
Karim Benzema|เบนเซม่า
Gonzalo Higuain|อิกวาอิน
Mesut Ozil|โอซิล
Angel Di Maria|ดิ มาเรีย
Luka Modric|โมดริช
Toni Kroos|โครส
Gareth Bale|เบล
Isco|อิสโก้
James Rodriguez|ฮาเมส
Casemiro|กาเซมิโร่
Dani Carvajal|การ์บาฆาล
Raphael Varane|วาราน
Keylor Navas|นาบาส
Thibaut Courtois|กูร์ตัวส์
Eden Hazard|อาซาร์
Vinicius Junior|วินิซิอุส
Rodrygo|โรดริโก้
Federico Valverde|บัลเบร์เด้
Eduardo Camavinga|กามาวินก้า
Aurelien Tchouameni|ชูอาเมนี่
Jude Bellingham|เบลลิงแฮม
Kylian Mbappe|เอ็มบัปเป้
Antonio Rudiger|รูดิเกอร์
Eder Militao|มิลิเตา
David Alaba|อลาบา
Ferland Mendy|แฟร์ลอง เมนดี้
Brahim Diaz|บราฮิม
Arda Guler|อาร์ดา กูเลอร์|กูเลอร์
Dean Huijsen|ไฮเซ่น
Trent Alexander-Arnold|อเล็กซานเดอร์ อาร์โนลด์|เทรนต์
Franco Mastantuono|มาสตันตูโอโน่
Alvaro Arbeloa|อาร์เบโลอา
Alfredo Di Stefano|ดิ สเตฟาโน่
Ferenc Puskas|ปุสกัส
Fabio Cannavaro|คันนาวาโร่
Ruud van Nistelrooy|ฟาน นิสเตลรอย
Claude Makelele|มาเกเลเล่
Steve McManaman|แม็คมานามาน
Joselu|โฆเซลู
`) },
  { id: 'fbar', name: '🔵🔴 นักเตะบาร์เซโลน่า', words: L(`
Lionel Messi|เมสซี่|ลีโอเนล เมสซี่
Xavi Hernandez|ชาบี
Andres Iniesta|อิเนียสต้า
Carles Puyol|ปูยอล
Gerard Pique|ปิเก้
Sergio Busquets|บุสเก็ตส์
Victor Valdes|บัลเดส
Dani Alves|ดานี่ อัลเวส
Jordi Alba|จอร์ดี้ อัลบา
Neymar|เนย์มาร์
Luis Suarez|ซัวเรซ
Samuel Eto'o|เอโต้
Thierry Henry|อองรี
Ronaldinho|โรนัลดินโญ่
Rivaldo|ริวัลโด้
Ronaldo Nazario|โรนัลโด้ เนื้อทอง|R9
Johan Cruyff|ครอยฟ์
Diego Maradona|มาราโดน่า
Hristo Stoichkov|สตอยช์คอฟ
Romario|โรมาริโอ
Luis Figo|ฟิโก้
Patrick Kluivert|ไคลเวิร์ต
Deco|เดโก้
David Villa|ดาบิด บีย่า|บีย่า
Pedro Rodriguez|เปโดร
Cesc Fabregas|ฟาเบรกาส
Javier Mascherano|มาสเคราโน่
Ivan Rakitic|ราคิติช
Marc-Andre ter Stegen|แทร์ สเตเก้น
Ousmane Dembele|เดมเบเล่
Philippe Coutinho|คูตินโญ่
Antoine Griezmann|กรีซมันน์
Frenkie de Jong|เดอ ยอง|เฟรงกี้ เดอ ยอง
Pedri|เปดรี้
Gavi|กาบี้
Ansu Fati|อันซู ฟาติ
Robert Lewandowski|เลวานดอฟสกี้|เลวา
Raphinha|ราฟินญ่า
Ronald Araujo|อาราอูโฮ
Jules Kounde|กุนเด้
Lamine Yamal|ลามีน ยามาล|ยามาล
Pau Cubarsi|กูบาร์ซี่
Alejandro Balde|บัลเด้
Dani Olmo|ดานี่ โอลโม่|โอลโม่
Fermin Lopez|เฟร์มิน
Marc Casado|กาซาโด้
Inigo Martinez|อินิโก้ มาร์ติเนซ
Joan Garcia|ฆวน การ์เซีย
Marcus Rashford|แรชฟอร์ด
Ferran Torres|เฟร์ราน ตอร์เรส
Ilkay Gundogan|กุนโดกัน
Arturo Vidal|บีดัล
Yaya Toure|ยาย่า ตูเร่
Eric Abidal|อบีดัล
Pep Guardiola|เป๊ป กวาร์ดิโอล่า
Ronald Koeman|คูมัน
`) },
  { id: 'fbay', name: '🔴 นักเตะบาเยิร์น', words: L(`
Thomas Muller|โทมัส มุลเลอร์|มุลเลอร์
Manuel Neuer|นอยเออร์
Robert Lewandowski|เลวานดอฟสกี้|เลวา
Arjen Robben|ร็อบเบน
Franck Ribery|ริเบรี่
Philipp Lahm|ลาห์ม
Bastian Schweinsteiger|ชไวน์สไตเกอร์
Oliver Kahn|คาห์น
Michael Ballack|บัลลัค
Lothar Matthaus|มัทเธอุส
Gerd Muller|แกร์ด มุลเลอร์
Franz Beckenbauer|เบคเคนบาวเออร์
Karl-Heinz Rummenigge|รุมเมนิกเก้
Mehmet Scholl|ชอลล์
Giovane Elber|เอลแบร์
Claudio Pizarro|ปิซาร์โร่
Roy Makaay|มาไค
Luca Toni|ลูก้า โตนี่
Mario Gomez|มาริโอ โกเมซ
Mario Mandzukic|มันซูกิช
Toni Kroos|โครส
Javi Martinez|ฆาบี้ มาร์ติเนซ
Jerome Boateng|โบอาเต็ง
David Alaba|อลาบา
Mats Hummels|ฮุมเมิลส์
Arturo Vidal|บีดัล
Thiago Alcantara|ติอาโก้
Douglas Costa|ดักลาส คอสต้า
Kingsley Coman|โกมัน
Serge Gnabry|กนาบรี้
Leon Goretzka|กอเรตซ์ก้า
Joshua Kimmich|คิมมิช
Leroy Sane|ซาเน่
Jamal Musiala|มูเซียล่า
Alphonso Davies|อัลฟอนโซ่ เดวีส์|เดวีส์
Benjamin Pavard|ปาวาร์ด
Lucas Hernandez|ลูกัส แอร์นานเดซ
Dayot Upamecano|อูปาเมคาโน่
Matthijs de Ligt|เดอ ลิกต์
Kim Min-jae|คิม มิน แจ|คิมมินแจ
Harry Kane|แฮร์รี่ เคน|เคน
Michael Olise|โอลิเซ่
Sadio Mane|มาเน่
Joao Palhinha|ปาลินญ่า
Konrad Laimer|ไลเมอร์
Jonathan Tah|ทาห์
Luis Diaz|หลุยส์ ดิอาซ
Aleksandar Pavlovic|ปาฟโลวิช
Eric Maxim Choupo-Moting|ชูโป โมติ้ง
Philippe Coutinho|คูตินโญ่
Ze Roberto|เซ โรแบร์โต้
Lucio|ลูซิโอ
Bixente Lizarazu|ลิซาราซู
Owen Hargreaves|ฮาร์กรีฟส์
Willy Sagnol|ซาญอล
`) },
  { id: 'fth', name: '🇹🇭 นักเตะทีมชาติไทย', words: L(`
Chanathip Songkrasin|ชนาธิป|ชนาธิป สรงกระสินธ์|เจ ชนาธิป|เมสซี่เจ
Teerasil Dangda|ธีรศิลป์|ธีรศิลป์ แดงดา|มุ้ย
Kiatisuk Senamuang|เกียรติศักดิ์|เกียรติศักดิ์ เสนาเมือง|ซิโก้
Dusit Chalermsan|ดุสิต เฉลิมแสน
Tawan Sripan|ตะวัน ศรีปาน
Therdsak Chaiman|เทิดศักดิ์ ใจมั่น
Datsakorn Thonglao|ดัสกร ทองเลา
Sutee Suksomkit|สุธี สุขสมกิจ
Theeratorn Bunmathan|ธีราทร บุญมาทัน
Supachai Chaided|ศุภชัย ใจเด็ด
Supachok Sarachat|ศุภโชค สารชาติ
Suphanat Mueanta|ศุภณัฏฐ์ เหมือนตา
Ekanit Panya|เอกนิษฐ์ ปัญญา
Bordin Phala|บดินทร์ ผาลา
Kawin Thamsatchanan|กวินทร์ ธรรมสัจจานันท์|กวินทร์
Siwarak Tedsungnoen|ศิวรักษ์ เทศสูงเนิน
Patiwat Khammai|ปฏิวัติ คำไหม
Chatchai Budprom|ฉัตรชัย บุตรพรม
Pansa Hemviboon|พันศา เหมวิบูลย์
Elias Dolah|อีเลียส ดอเลาะ
Tristan Do|ทริสตอง โด
Sarach Yooyen|สารัช อยู่เย็น
Tanaboon Kesarat|ธนบูรณ์ เกษารัตน์
Thitipan Puangchan|ฐิติพันธ์ พ่วงจันทร์
Weerathep Pomphan|วีระเทพ ป้อมพันธุ์
Adisak Kraisorn|อดิศักดิ์ ไกรษร
Mongkol Tossakrai|มงคล ทศไกร
Pokklaw Anan|ปกเกล้า อนันต์
Charyl Chappuis|ชาริล ชัปปุยส์
Nicholas Mickelson|นิโคลัส มิคเกลสัน
Sompong Soleb|สมปอง สอเหลบ
Piyapong Pue-on|ปิยะพงษ์ ผิวอ่อน
Worrawoot Srimaka|วรวุธ ศรีมะฆะ
Niweat Siriwong|นิเวศน์ ศิริวงศ์
Sarayoot Chaikamdee|ศรายุทธ ชัยคำดี
Patrik Gustavsson|แพทริค กุสตาฟส์สัน
Jonathan Khemdee|โจนาธาน เข็มดี
Peerapat Notchaiya|พีรพัฒน์ โน๊ตชัยยา
Narubadin Weerawatnodom|นฤบดินทร์ วีรวัฒโนดม
Kritsada Kaman|กฤษดา กาแมน
Ben Davis|เบน เดวิส
William Weidersjo|วิลเลียม ไวเดอร์โช
`) },
];
