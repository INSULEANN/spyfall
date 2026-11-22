// คำไว — หมวดตัวละครอนิเมะ แยกตามเรื่อง (บรรทัดละ 1 ตัว: "ชื่ออังกฤษ|ชื่อไทย|ชื่อเรียกอื่น")
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);

export const ANIME_PACKS = [
  { id: 'aop', name: '🏴‍☠️ ตัวละครวันพีช', words: L(`
Monkey D. Luffy|ลูฟี่|มังกี้ ดี ลูฟี่
Roronoa Zoro|โซโล|โรโรโนอา โซโล|โซโร
Nami|นามิ
Usopp|อุซป|อุซบ
Sanji|ซันจิ
Tony Tony Chopper|ช็อปเปอร์|ชอปเปอร์
Nico Robin|โรบิน|นิโค โรบิน
Franky|แฟรงกี้|แฟรงค์กี้
Brook|บรู๊ค|บรุ๊ค
Jinbe|จินเบ|จิมเบ
Portgas D. Ace|เอส|พอร์ตกัส ดี เอส
Sabo|ซาโบ้|ซาโบ
Shanks|แชงค์|แชงคูส
Buggy|บากี้
Dracule Mihawk|มิฮอว์ค|มิฮอค
Boa Hancock|แฮนค็อก|โบอา แฮนค็อก
Trafalgar Law|ลอว์|ทราฟัลการ์ ลอว์
Eustass Kid|ยูสตาส คิด|คิด
Marshall D. Teach|หนวดดำ|ทีช|Blackbeard
Edward Newgate|หนวดขาว|Whitebeard
Gol D. Roger|โรเจอร์|โกล ดี โรเจอร์
Monkey D. Garp|การ์ป
Monkey D. Dragon|ดราก้อน
Kaido|ไคโด
Big Mom|บิ๊กมัม|Charlotte Linlin|ชาร์ลอตต์ ลินลิน
Charlotte Katakuri|คาตาคุริ
Donquixote Doflamingo|โดฟลามิงโก้|โดฟลามิงโก
Crocodile|คร็อกโคไดล์|ครอกโคไดล์
Enel|เอเนล|Eneru
Rob Lucci|ลุจจิ|ร็อบ ลุจจิ
Akainu|อาคาอินุ|Sakazuki|ซาคาซึกิ
Aokiji|อาโอคิจิ|Kuzan|คุซัน
Kizaru|คิซารุ|Borsalino
Fujitora|ฟูจิโทร่า
Sengoku|เซ็นโงคุ
Smoker|สโมคเกอร์
Tashigi|ทาชิกิ
Koby|โคบี้|Coby
Helmeppo|เฮลเมปโป
Nefertari Vivi|วีวี่|เนเฟลตาริ วีวี่
Carrot|แครอท
Yamato|ยามาโตะ
Kozuki Oden|โอเด้ง|โคซึกิ โอเด้ง
Kozuki Momonosuke|โมโมโนสุเกะ
Kinemon|คินเอม่อน
Marco|มาร์โค
Emporio Ivankov|อีวานคอฟ
Bon Clay|บอนคุเรย์|Mr. 2
Arlong|อารอน|อาร์ลอง
Don Krieg|ดอนครีก
Kuro|คุโระ
Wapol|วาโพล
Gecko Moria|โมเรีย|เก็คโค โมเรีย
Bartholomew Kuma|คุมะ
Perona|เพโรน่า
Rebecca|รีเบคก้า
Shirahoshi|ชิราโฮชิ
Kaku|คาคุ
Kalifa|คาลิฟา
Laboon|ลาบูน
Vegapunk|เวก้าพังค์|เวกาพังค์
Imu|อิมุ
Silvers Rayleigh|เรย์ลี่
Hody Jones|โฮดี้ โจนส์
Caesar Clown|ซีซาร์ คลาวน์
Bartolomeo|บาร์โทโลมิโอ
Cavendish|คาเวนดิช
Bepo|เบโป
Kyros|ไคลอส
Bellamy|เบลลามี่
Nefertari Cobra|โคบร้า
Kaya|คายะ
Gin|กิน
Zeff|เซฟ|เรด เลก เซฟ
Nojiko|โนจิโกะ
Bell-mere|เบลเมล
Genzo|เก็นโซ
Daz Bonez|มิสเตอร์วัน|Mr. 1
Galdino|มิสเตอร์ทรี|Mr. 3
Miss Goldenweek|มิสโกลเด้นวีค
Igaram|อิการาม
Pell|เปล
Chaka|จาก้า
Kureha|คุเรฮะ|ด็อกเตอร์คุเรฮะ
Hiriluk|ฮิรุรุค
Dalton|ดาลตัน
Gan Fall|กันฟอล
Conis|โคนิส
Wyper|ไวเปอร์
Paulie|พอลลี่
Iceburg|ไอซ์เบิร์ก
Kokoro|โคโคโระ
Spandam|สแปนดัม
Jabra|จาบูร่า
Blueno|บลูโน่
Absalom|อับซาลอม
Ryuma|ริวมะ
Lola|โลล่า
Shakky|แชคกี้
Duval|ดูวาล
Hatchan|ฮัจจัง|Hachi
Camie|เคมี่
Magellan|มาเจลลัน
Hannyabal|ฮันยาบัล
Inazuma|อินาสึมะ
Crocus|โครคัส
Kozuki Hiyori|ฮิโยริ
Denjiro|เด็นจิโร่
Kawamatsu|คาวามัตสึ
Raizo|ไรโซ
Kanjuro|คันจูโร่
Kikunojo|คิคุ|คิคุโนโจ
Kurozumi Orochi|โอโรจิ
Jack|แจ็ค
Who's-Who|ฮูส์ฮู
Ulti|อุลติ
Koala|โคอาล่า
Hack|แฮ็ค
Belo Betty|เบโล่ เบ็ตตี้
Ryokugyu|เรียวคุกิว
Stussy|สตัสซี่
Jewelry Bonney|บอนนี่|จูเวลรี่ บอนนี่
Saint Jaygarcia Saturn|ซาเทิร์น
Shiryu|ชิริว
Van Augur|แวน ออเกอร์
Jesus Burgess|เบอร์เจส
Laffitte|ลาฟิตต์
Charlotte Pudding|พุดดิ้ง
Charlotte Cracker|แคร็กเกอร์
Charlotte Smoothie|สมูทตี้
Charlotte Perospero|เพรอสเปโร่
Pekoms|เปคอมส์
Capone Bege|คาโปเน่ เบจ
Gaimon|ไกมอน
Alvida|อัลวิด้า
Morgan|มอร์แกน
Kuina|คุอินะ
Makino|มาคิโนะ
`) },
  { id: 'ajjk', name: '🤞 ตัวละครมหาเวทย์ผนึกมาร', words: L(`
Yuji Itadori|อิตาโดริ|ยูจิ|อิตาโดริ ยูจิ
Megumi Fushiguro|เมงุมิ|ฟุชิงุโระ|ฟุชิงุโระ เมงุมิ
Nobara Kugisaki|โนบาระ|คุงิซากิ
Satoru Gojo|โกโจ|โกโจ ซาโตรุ|ซาโตรุ
Ryomen Sukuna|สุคุนะ|เรียวเมน สุคุนะ
Suguru Geto|เกโท|เกะโท
Kento Nanami|นานามิ|นานามิ เคนโตะ
Maki Zenin|มากิ|เซนอิน มากิ
Toge Inumaki|อินุมากิ|โทเกะ
Panda|แพนด้า
Yuta Okkotsu|ยูตะ|อคคตสึ|โอกคตสึ ยูตะ
Rika Orimoto|ริกะ
Aoi Todo|โทโด|โทโด อาโออิ
Mai Zenin|ไม|เซนอิน ไม
Noritoshi Kamo|คาโมะ
Kasumi Miwa|มิวะ
Momo Nishimiya|นิชิมิยะ
Mechamaru|เมคามารุ
Masamichi Yaga|ยากะ
Yoshinobu Gakuganji|กาคุกันจิ
Shoko Ieiri|โชโกะ|อิเอริ
Kiyotaka Ijichi|อิจิจิ
Toji Fushiguro|โทจิ
Mahito|มาฮิโตะ
Jogo|โจโก
Hanami|ฮานามิ
Dagon|ดากอน
Choso|โชโซ
Kenjaku|เคนจาคุ
Uraume|อุราอุเมะ
Junpei Yoshino|จุนเป
Hajime Kashimo|คาชิโมะ
Kinji Hakari|ฮาคาริ
Kirara Hoshi|คิราระ
Hiromi Higuruma|ฮิงุรุมะ
Fumihiko Takaba|ทาคาบะ
Naoya Zenin|นาโอยะ
Naobito Zenin|นาโอบิโตะ
Yuki Tsukumo|ยูกิ|สึคุโมะ
Tengen|เท็นเง็น
Mei Mei|เมเม|เหม่ยเหม่ย
Utahime Iori|อุตะฮิเมะ
Atsuya Kusakabe|คุซาคาเบะ
Miguel|มิเกล
Ryu Ishigori|อิชิโกริ
Takako Uro|อุโระ
Yorozu|โยโรซุ
Hana Kurusu|คุรุสุ|Angel
Tsumiki Fushiguro|สึมิกิ
Eso|เอโซ
Kechizu|เคจิซุ
Ui Ui|อุยอุย
Arata Nitta|นิตตะ อาราตะ
Akari Nitta|นิตตะ อาคาริ
Shigemo Haruta|ฮารุตะ
Riko Amanai|อามาไน ริโกะ|ริโกะ
Misato Kuroi|คุโรอิ
Yu Haibara|ไฮบาระ ยู
Juzo Kumiya|คุมิยะ
Granny Ogami|โอกามิ
Mimiko Hasaba|มิมิโกะ
Nanako Hasaba|นานาโกะ
Larue|ลารู
Mahoraga|มาโฮรากะ
Remi|เรมี
Reggie Star|เรจจี้ สตาร์
Iori Hazenoki|ฮาเซโนกิ
Kurourushi|คุโรอุรุชิ
Dhruv Lakdawalla|ดรูฟ
Takuma Ino|อิโนะ ทาคุมะ
Jinichi Zenin|จินอิจิ
Ogi Zenin|โองิ
Ranta|รันตะ
Rin Amai|อามาอิ ริน
Kogane|โคกาเนะ
Charles Bernard|ชาร์ลส์
Wasuke Itadori|อิตาโดริ วาสุเกะ|ปู่อิตาโดริ
Kaori Itadori|คาโอริ
Jin Itadori|จิน อิตาโดริ
Shiu Kong|ชิว คง
`) },
  { id: 'anrt', name: '🍥 ตัวละครนารูโตะ', words: L(`
Naruto Uzumaki|นารูโตะ|อุซึมากิ นารูโตะ
Sasuke Uchiha|ซาสึเกะ|อุจิวะ ซาสึเกะ
Sakura Haruno|ซากุระ
Kakashi Hatake|คาคาชิ
Hinata Hyuga|ฮินาตะ
Neji Hyuga|เนจิ
Rock Lee|ร็อค ลี
Tenten|เท็นเท็น
Shikamaru Nara|ชิกามารุ
Ino Yamanaka|อิโนะ
Choji Akimichi|โจจิ|โชจิ
Kiba Inuzuka|คิบะ
Shino Aburame|ชิโนะ
Gaara|กาอาระ
Temari|เทมาริ
Kankuro|คันคุโร่
Itachi Uchiha|อิทาจิ
Madara Uchiha|มาดาระ
Obito Uchiha|โอบิโตะ|Tobi|โทบิ
Jiraiya|จิไรยะ|เซียนลามก
Tsunade|ซึนาเดะ
Orochimaru|โอโรจิมารุ
Minato Namikaze|มินาโตะ
Kushina Uzumaki|คุชินะ
Hashirama Senju|ฮาชิรามะ
Tobirama Senju|โทบิรามะ
Hiruzen Sarutobi|ฮิรุเซ็น|ซารุโทบิ
Might Guy|ไก|ไมท์ ไก
Iruka Umino|อิรุกะ
Kabuto Yakushi|คาบุโตะ
Nagato|นากาโตะ|Pain|เพน
Konan|โคนัน
Yahiko|ยาฮิโกะ
Deidara|เดดาระ
Sasori|ซาโซริ
Hidan|ฮิดัน
Kakuzu|คาคุซึ
Kisame Hoshigaki|คิซาเมะ
Zetsu|เซ็ตสึ
Killer Bee|คิลเลอร์บี
Kurama|คุรามะ|จิ้งจอกเก้าหาง
Zabuza Momochi|ซาบุซะ
Haku|ฮาคุ
Sai|ไซ
Yamato|ยามาโตะ
Shisui Uchiha|ชิซุย
Kaguya Otsutsuki|คางุยะ
Boruto Uzumaki|โบรุโตะ
Konohamaru|โคโนฮามารุ
Asuma Sarutobi|อาสึมะ
Kurenai Yuhi|คุเรไน
Danzo Shimura|ดันโซ
Kimimaro|คิมิมาโร่
Karin|คาริน
Suigetsu|ซุยเก็ตสึ
Jugo|จูโกะ
Mei Terumi|เมย์ เทรุมิ
Onoki|โอโนกิ
Rin Nohara|ริน
Sarada Uchiha|ซาราดะ
Hanabi Hyuga|ฮานาบิ
Hiashi Hyuga|ฮิอาชิ
Fugaku Uchiha|ฟุงาคุ
Mikoto Uchiha|มิโคโตะ
Izuna Uchiha|อิซึนะ
Indra Otsutsuki|อินทรา
Asura Otsutsuki|อาชูร่า
Hagoromo Otsutsuki|ฮาโกโรโมะ|เซียนหกวิถี
Hamura Otsutsuki|ฮามุระ
Momoshiki Otsutsuki|โมโมชิกิ
Kinshiki Otsutsuki|คินชิกิ
Isshiki Otsutsuki|อิชชิกิ
Toneri Otsutsuki|โทเนริ
Kawaki|คาวากิ
Mitsuki|มิตสึกิ
Himawari Uzumaki|ฮิมาวาริ
Chocho Akimichi|โจโจ
Inojin Yamanaka|อิโนจิน
Shikadai Nara|ชิกาได
Sumire Kakei|สุมิเระ
Metal Lee|เมทัล ลี
Shizune|ชิซุเนะ
Anko Mitarashi|อันโกะ
Ibiki Morino|อิบิกิ
Genma Shiranui|เก็นมะ
Hayate Gekko|ฮายาเตะ
Kotetsu Hagane|โคเท็ตสึ
Izumo Kamizuki|อิซึโมะ
Ebisu|เอบิสึ
Teuchi|เทอุจิ|ลุงร้านราเม็ง
Ayame|อายาเมะ
Tazuna|ทาซึนะ
Inari|อินาริ
Gato|กาโต้
Dosu Kinuta|โดสุ
Kidomaru|คิโดมารุ
Tayuya|ทายูย่า
Sakon|ซาคอน
Jirobo|จิโรโบ
Guren|กุเร็น
Utakata|อุทาคาตะ
Fu|ฟู
Han|ฮัน
Roshi|โรชิ
Yugito Nii|ยูกิโตะ
Yagura|ยางุระ
Darui|ดารุย
Ay|ไรคาเงะ|A
Chojuro|โจจูโร่
Kurotsuchi|คุโรสึจิ
Mifune|มิฟุเนะ
Rasa|ราสะ
Baki|บากิ
Chiyo|ชิโยะ
Ebizo|เอบิโซ
Shukaku|ชูคาคุ
Matatabi|มาทาทาบิ
Gyuki|กิวกิ
Kashin Koji|คาชิน โคจิ
Jigen|จิเก็น
Delta|เดลต้า
Eida|เอดะ
Daemon|ดีม่อน
`) },
  { id: 'adb', name: '🐉 ตัวละครดราก้อนบอล', words: L(`
Son Goku|โงกุน|ซน โกคู|โกคู|Kakarot|คาคาร็อต
Vegeta|เบจิต้า
Son Gohan|โกฮัง
Son Goten|โกเท็น
Trunks|ทรังคส์
Piccolo|พิคโกโร่
Krillin|คุริลิน
Bulma|บลูม่า
Chi-Chi|จีจี้
Master Roshi|ผู้เฒ่าเต่า|Muten Roshi|มุเท็นโรชิ
Yamcha|ยามุชา
Tien Shinhan|เทนชินฮัง|Tenshinhan
Chiaotzu|เกาซือ|Chaozu
Yajirobe|ยาจิโรเบ
Oolong|อูหลง
Puar|ผูเอ่อ
Android 18|มนุษย์ดัดแปลงหมายเลข 18|หมายเลข 18
Android 17|มนุษย์ดัดแปลงหมายเลข 17|หมายเลข 17
Android 16|มนุษย์ดัดแปลงหมายเลข 16|หมายเลข 16
Frieza|ฟรีเซอร์|Freeza
Cell|เซล
Majin Buu|จอมมารบู|บู
Babidi|บาบิดี้
Dabura|ดาบูร่า
Raditz|ราดิช
Nappa|นัปป้า
Bardock|บาร์ด็อก
Broly|โบรลี่
Beerus|บิรุส
Whis|วิส
Zeno|เซนโอ
Goku Black|โกคูแบล็ค
Zamasu|ซามัส
Jiren|จิเรน
Hit|ฮิต
Cabba|คาเบ
Caulifla|คอลิฟล่า
Kale|เคล
Videl|วีเดล
Pan|ปัง
Mr. Satan|มิสเตอร์ซาตาน|Hercule
Gotenks|โกเท็นคส์
Gogeta|โกจิต้า
Vegito|เบจิโตะ
Kami|พระเจ้าพิภพ
Mr. Popo|มิสเตอร์โปโป้
Dende|เดนเดะ
King Kai|ไคโอ|ไคโอซามะ
Shenron|เทพเจ้ามังกร|เสินหลง|Shenlong
Uub|อู้บ
Ginyu|กินิว|กัปตันกินิว
Zarbon|ซาบอน
Dodoria|โดโดเรีย
Cooler|คูลเลอร์
Launch|ลันช์
Korin|เทพแมวคาริน
Pilaf|พิลาฟ
Grandpa Gohan|ปู่โกฮัง
Fortuneteller Baba|บาบาเฒ่า
Mercenary Tao|เถาไป่ไป่|Tao Pai Pai
Crane Hermit|เซียนนกกระเรียน
Commander Red|ผู้บัญชาการเรด
General Blue|เจนเนอรัลบลู
Android 8|หมายเลข 8
Dr. Gero|ด็อกเตอร์เกโร|หมายเลข 20
Android 19|หมายเลข 19
Android 21|หมายเลข 21
King Piccolo|ราชาพิคโกโร่|ปีศาจพิคโกโร่
Tambourine|แทมบูรีน
Garlic Jr.|การ์ลิคจูเนียร์
Turles|ทาเลส
Lord Slug|สลัก
Janemba|จาเนมบะ
Bojack|โบแจ็ค
Baby|เบบี้
Omega Shenron|โอเมก้าเสินหลง
Bulla|บูร่า|Bra
Marron|มารอน
Mai|ไม
Shu|ชู
Gine|กีเน่
King Vegeta|ราชาเบจิต้า
Champa|แชมป่า
Vados|วาดอส
Frost|ฟรอส
Toppo|ท็อปโป้
Dyspo|ดิสโป้
Kefla|เคฟล่า
Moro|โมโร่
Granolah|กราโนล่า
Gamma 1|แกมม่า 1
Gamma 2|แกมม่า 2
Cell Max|เซลล์แม็กซ์
Dr. Hedo|ด็อกเตอร์เฮโดะ
Supreme Kai|ไคโอชิน
Kibito|คิบิโตะ
Old Kai|ไคโอชินผู้เฒ่า
Grand Priest|มหาปุโรหิต|Daishinkan
Spopovich|สโปโปวิช
Yamu|ยามุ
Pui Pui|ปุยปุย
Yakon|ยาคอน
Guldo|กูลโด้
Recoome|รีคูม
Burter|บาเตอร์
Jeice|จีส
Nail|เนล
Guru|ผู้เฒ่าใหญ่|Grand Elder Guru
`) },
  { id: 'ads', name: '🗡️ ตัวละครดาบพิฆาตอสูร', words: L(`
Tanjiro Kamado|ทันจิโร่|คามาโดะ ทันจิโร่
Nezuko Kamado|เนซึโกะ
Zenitsu Agatsuma|เซนอิตสึ
Inosuke Hashibira|อิโนะสุเกะ
Kanao Tsuyuri|คานาโอะ
Genya Shinazugawa|เก็นยะ
Giyu Tomioka|กิยู|โทมิโอกะ
Shinobu Kocho|ชิโนบุ
Kyojuro Rengoku|เร็นโงคุ|เคียวจูโร่
Tengen Uzui|เท็นเง็น|อุซุย
Mitsuri Kanroji|มิตสึริ
Muichiro Tokito|มุอิจิโร่|โทคิโตะ
Obanai Iguro|โอบาไน|อิงุโระ
Sanemi Shinazugawa|ซาเนมิ
Gyomei Himejima|เกียวเมย์|ฮิเมจิมะ
Kagaya Ubuyashiki|อุบุยาชิกิ|คางายะ
Sakonji Urokodaki|อุโรโคดากิ
Sabito|ซาบิโตะ
Makomo|มาโกโมะ
Jigoro Kuwajima|คุวาจิมะ
Kanae Kocho|คานาเอะ
Tamayo|ทามาโยะ
Yushiro|ยูชิโร่
Murata|มุราตะ
Aoi Kanzaki|อาโออิ
Haganezuka|ฮากาเนะซึกะ
Muzan Kibutsuji|มุซัน|คิบุตสึจิ
Kokushibo|โคคุชิโบ
Doma|โดมะ|Douma
Akaza|อาคาสะ|อาคาซะ
Hantengu|ฮันเท็นงุ
Gyokko|เกียวโกะ
Daki|ดากิ
Gyutaro|กิวทาโร่
Kaigaku|ไคงาคุ
Nakime|นาคิเมะ
Rui|รุย
Enmu|เอ็นมุ
Kyogai|เคียวไก
Susamaru|ซูซามารุ
Yahaba|ยาฮาบะ
Yoriichi Tsugikuni|โยริอิจิ
Kie Kamado|คิเอะ
Takeo Kamado|ทาเคโอะ
Hanako Kamado|ฮานาโกะ
Shigeru Kamado|ชิเงรุ
Rokuta Kamado|โรคุตะ
Tanjuro Kamado|ทันจูโร่
Saburo|ซาบุโร่
Kiriya Ubuyashiki|คิริยะ
Amane Ubuyashiki|อามาเนะ
Sumi|ซูมิ
Kiyo|คิโยะ
Naho|นาโฮะ
Goto|โกโตะ
Ozaki|โอซากิ
Kotetsu|โคเท็ตสึ
Hinatsuru|ฮินาสึรุ
Makio|มาคิโอะ
Suma|ซูมะ
Senjuro Rengoku|เซ็นจูโร่
Shinjuro Rengoku|ชินจูโร่
Kaburamaru|คาบุรามารุ
Chachamaru|ชาชามารุ
Sekido|เซกิโดะ
Karaku|คาราคุ
Aizetsu|ไอเซ็ตสึ
Urogi|อุโรงิ
Zohakuten|โซฮาคุเท็น
Kamanue|คามานุเอะ
Rokuro|โรคุโระ
Wakuraba|วาคุราบะ
Mukago|มุคาโกะ
Mother Spider Demon|แม่แมงมุม
Father Spider Demon|พ่อแมงมุม
Swamp Demon|อสูรบึง
Koyuki|โคยูกิ
Keizo|เคโซ
Tsutako Tomioka|สึทาโกะ
Kotoha|โคโตฮะ
`) },
  { id: 'aaot', name: '🧱 ตัวละครผ่าพิภพไททัน', words: L(`
Eren Yeager|เอเรน|เอเรน เยเกอร์|Eren Jaeger
Mikasa Ackerman|มิคาสะ
Armin Arlert|อาร์มิน
Levi Ackerman|ลีไว|รีไวล์|Levi
Erwin Smith|เออร์วิน
Hange Zoe|ฮันจิ|ฮันเงะ
Jean Kirstein|ฌอง|จีน
Connie Springer|คอนนี่
Sasha Blouse|ซาช่า
Historia Reiss|ฮิสทอเรีย|คริสต้า|Krista Lenz
Ymir|ยมิร์|ยิมีร์
Reiner Braun|ไรเนอร์
Bertholdt Hoover|เบอร์ทอลด์
Annie Leonhart|แอนนี่
Zeke Yeager|ซีค
Grisha Yeager|กริชา
Carla Yeager|คาร์ล่า
Hannes|ฮันเนส
Marco Bott|มาร์โก้
Petra Ral|เพตร้า
Mike Zacharias|ไมค์
Dot Pixis|พิกซิส
Kenny Ackerman|เคนนี่
Rod Reiss|ร็อด ไรส์
Floch Forster|ฟล็อค
Gabi Braun|กาบี้
Falco Grice|ฟัลโก้
Pieck Finger|พีค
Porco Galliard|พอร์โก้
Marcel Galliard|มาร์เซล
Yelena|เยเลน่า
Onyankopon|โอนยังโกปง
Keith Shadis|ชาดิส
Eld Jinn|เอลด์
Oluo Bozado|โอลูโอ
Gunther Schultz|กุนเธอร์
Moblit Berner|มอบลิท
Nile Dok|ไนล์
Darius Zackly|แซ็กลีย์
Willy Tybur|วิลลี่ ไทเบอร์
Lara Tybur|ลาร่า
Ymir Fritz|ยมิร์ ฟริตซ์
Kiyomi Azumabito|คิโยมิ
Theo Magath|มากาธ
Colt Grice|โคลท์
Dina Fritz|ไดน่า
Faye Yeager|เฟย์
Tom Xaver|ทอม ซาเวอร์
Eren Kruger|ครูเกอร์|นกฮูก
Frieda Reiss|ฟรีดา
Uri Reiss|อูริ
Karl Fritz|คาร์ล ฟริตซ์
Hitch Dreyse|ฮิทช์
Marlowe Freudenberg|มาร์โลว์
Thomas Wagner|โทมัส วากเนอร์
Mina Carolina|มีน่า
Franz Kefka|ฟรานซ์
Hanna Diamant|ฮันนา
Samuel Linke-Jackson|ซามูเอล
Daz|ดาซ
Rico Brzenska|ริโก้
Ian Dietrich|เอียน
Mitabi Jarnach|มิตาบิ
Dimo Reeves|ดิโม รีฟส์
Flegel Reeves|เฟลเกล
Nifa|นิฟา
Djel Sannes|ซานเนส
Traute Carven|ทราวเทอ
Kaya|คายะ
Louise|หลุยส์
Udo|อูโด้
Zofia|โซเฟีย
Calvi|คาลวี
Gross|กรอส
Kuchel Ackerman|คูเชล
Ilse Langnar|อิลเซ
Kitz Woermann|คิทซ์
Nicolo|นิโคโล่
`) },
  { id: 'acon', name: '🔍 ตัวละครโคนัน', words: L(`
Conan Edogawa|โคนัน|เอโดงาวะ โคนัน
Shinichi Kudo|ชินอิจิ|คุโด้ ชินอิจิ
Ran Mouri|รัน|โมริ รัน
Kogoro Mouri|โคโกโร่|โมริ โคโกโร่|ลุงโมริ
Ai Haibara|ไฮบาระ|ไฮบาระ ไอ|Shiho Miyano|มิยาโนะ ชิโฮ
Professor Agasa|ด็อกเตอร์อากาสะ|อากาสะ
Ayumi Yoshida|อายูมิ
Genta Kojima|เก็นตะ
Mitsuhiko Tsuburaya|มิตสึฮิโกะ
Sonoko Suzuki|โซโนโกะ
Heiji Hattori|เฮจิ|ฮัตโตริ เฮจิ
Kazuha Toyama|คาซึฮะ
Kaito Kid|จอมโจรคิด|คิด|Kaito Kuroba|คุโรบะ ไคโตะ
Inspector Megure|สารวัตรเมงุเระ|เมงุเระ
Wataru Takagi|ทาคางิ
Miwako Sato|ซาโต้
Ninzaburo Shiratori|ชิราโทริ
Kazunobu Chiba|ชิบะ
Yumi Miyamoto|ยูมิ
Gin|ยิน
Vodka|วอดก้า
Vermouth|เวอร์มุท
Chianti|เคียนติ
Korn|คอร์น
Kir|คีร์|Hidemi Hondou
Bourbon|เบอร์เบิน|Toru Amuro|อามุโระ|Rei Furuya|ฟุรุยะ
Shuichi Akai|อาคาอิ|อาคาอิ ชูอิจิ|Rye|ไรย์
Subaru Okiya|โอคิยะ สึบารุ
Rum|รัม
Jodie Starling|โจดี้
James Black|เจมส์ แบล็ค
Eri Kisaki|เอริ
Yukiko Kudo|ยูกิโกะ
Yusaku Kudo|ยูซากุ
Masumi Sera|เซระ|มาสุมิ
Makoto Kyogoku|มาโกโตะ|เคียวโกคุ มาโกโตะ
Azusa Enomoto|อาซึสะ
Kansuke Yamato|ยามาโตะ คันสึเกะ
Akemi Miyano|อาเคมิ
Saguru Hakuba|ฮาคุบะ
Momiji Ooka|โมมิจิ
Misao Yamamura|ยามามูระ
Sango Yokomizo|โยโคมิโซะ ซันโกะ
Jugo Yokomizo|โยโคมิโซะ จูโกะ
Goro Otaki|โอตากิ
Heizo Hattori|ฮัตโตริ เฮโซ
Shizuka Hattori|ฮัตโตริ ชิซึกะ
Ginshiro Toyama|โทยามะ กินชิโร่
Fusae Campbell|ฟุซาเอะ
Sumiko Kobayashi|ครูโคบายาชิ
Kenji Hagiwara|ฮางิวาระ
Jinpei Matsuda|มัตสึดะ
Hiromitsu Morofushi|โมโรฟุชิ ฮิโรมิตสึ|สก็อตช์|Scotch
Wataru Date|ดาเตะ
Takaaki Morofushi|โคเมย์|โมโรฟุชิ ทาคาอากิ
Yui Uehara|อุเอะฮาระ
Naeko Miike|มิอิเกะ
Mary Sera|แมรี่
Shukichi Haneda|ฮาเนดะ ชูคิจิ
Calvados|คาลวาโดส
Pisco|พิสโก้
Irish|ไอริช
Tequila|เตกีล่า
Curacao|คูราเซา
Renya Karasuma|คาราสึมะ|บอสองค์กรชุดดำ
Andre Camel|คาเมล
Tomoaki Araide|อาไรเดะ
Rumi Wakasa|ครูรูมิ|วาคาสะ รูมิ
Hyoe Kuroda|คุโรดะ
Yuya Kazami|คาซามิ
Eisuke Hondou|ฮอนโด เอสุเกะ
Tsutomu Akai|อาคาอิ สึโตมุ
Aoko Nakamori|อาโอโกะ
Ginzo Nakamori|สารวัตรนากาโมริ
Jirokichi Suzuki|ซูซูกิ จิโรคิจิ
Ayako Suzuki|อายาโกะ
Elena Miyano|มิยาโนะ เอเลน่า
Atsushi Miyano|มิยาโนะ อัตสึชิ
Ryusuke Higo|ฮิโกะ ริวสุเกะ
`) },
  { id: 'amha', name: '🦸 ตัวละครมายฮีโร่', words: L(`
Izuku Midoriya|มิโดริยะ|เดกุ|Deku
Katsuki Bakugo|บาคุโก|คัตจัง|Bakugou
Shoto Todoroki|โทโดโรกิ|โชโตะ
Ochaco Uraraka|อุรารากะ
Tenya Iida|อีดะ|อิดะ
Eijiro Kirishima|คิริชิมะ
Tsuyu Asui|อาสึย|ฟรอปปี้
Momo Yaoyorozu|ยาโอโยโรสึ
Denki Kaminari|คามินาริ
Fumikage Tokoyami|โทโคยามิ
Kyoka Jiro|จิโร่
Minoru Mineta|มิเนตะ
Mina Ashido|อาชิโดะ
Hanta Sero|เซโระ
Mashirao Ojiro|โอจิโร่
Koji Koda|โคดะ
Rikido Sato|ซาโต้
Toru Hagakure|ฮากาคุเระ
Yuga Aoyama|อาโอยามะ
Mezo Shoji|โชจิ
Hitoshi Shinso|ชินโซ
All Might|ออลไมท์
Shota Aizawa|ไอซาวะ|Eraser Head|อีเรเซอร์เฮด
Present Mic|เพรสเซนต์ไมค์
Endeavor|เอนเดเวอร์
Hawks|ฮอว์คส์
Best Jeanist|เบสต์จีนนิสต์
Mirko|มิรุโกะ
Mirio Togata|มิริโอะ|เลมิลเลียน
Nejire Hado|เนจิเระ
Tamaki Amajiki|อามาจิกิ
Gran Torino|กรานโทริโน่
Recovery Girl|รีคัฟเวอรี่เกิร์ล
Nezu|เนซึ|ครูใหญ่เนซึ
Tomura Shigaraki|ชิงารากิ
All For One|ออลฟอร์วัน
Dabi|ดาบิ
Himiko Toga|โทงะ
Stain|สเตน
Twice|ทไวซ์
Mr. Compress|มิสเตอร์คอมเพรส
Spinner|สปินเนอร์
Kurogiri|คุโรงิริ
Overhaul|โอเวอร์ฮอล|Chisaki
Eri|เอริ
Gentle Criminal|เจนเทิลคริมินอล
Lady Nagant|เลดี้นากันต์
Muscular|มัสคิวลาร์
Neito Monoma|โมโนมะ
Itsuka Kendo|เคนโด
Tetsutetsu Tetsutetsu|เท็ตสึเท็ตสึ
Ibara Shiozaki|ชิโอซากิ
Kinoko Komori|โคโมริ
Pony Tsunotori|โพนี่
Juzo Honenuki|โฮเนนุกิ
Yosetsu Awase|อาวาเซะ
Setsuna Tokage|โทคาเงะ
Hiryu Rin|ฮิริว ริน
Mei Hatsume|ฮัตสึเมะ
Mt. Lady|เมาท์เลดี้
Kamui Woods|คามุยวูดส์
Edgeshot|เอดจ์ช็อต
Fat Gum|แฟตกัม
Ryukyu|ริวคิว
Sir Nighteye|เซอร์ไนท์อาย
Gang Orca|แก๊งออร์ก้า
Snipe|สไนป์
Midnight|มิดไนท์
Cementoss|ซีเมนทอส
Ectoplasm|เอ็กโทพลาสซึม
Power Loader|พาวเวอร์โหลดเดอร์
Thirteen|ธีร์ทีน
Vlad King|วลาดคิง
Hound Dog|ฮาวด์ด็อก
Lunch Rush|ลันช์รัช
Crust|ครัสต์
Manual|แมนนวล
Pixie-Bob|พิกซี่บ็อบ
Mandalay|แมนดาเลย์
Ragdoll|แร็กดอลล์
Tiger|ไทเกอร์
Kota Izumi|โคตะ
Inko Midoriya|อินโกะ
Mitsuki Bakugo|มิตสึกิ
Rei Todoroki|เร โทโดโรกิ
Fuyumi Todoroki|ฟุยุมิ
Natsuo Todoroki|นัตสึโอะ
Nana Shimura|นานะ ชิมูระ
Inasa Yoarashi|โยอาราชิ
Camie Utsushimi|คามิเอะ
Seiji Shishikura|ชิชิคุระ
Mustard|มัสตาร์ด
Moonfish|มูนฟิช
Magne|แม็กเน่
Re-Destro|รีเดสโตร
Gigantomachia|จิกันโตมาเคีย
Geten|เกเท็น
Skeptic|สเคปติก
Curious|คิวเรียส
Nine|ไนน์
Star and Stripe|สตาร์แอนด์สไตรป์
Rappa|รัปปะ
Mimic|มิมิค
Chronostasis|โครโนสตาซิส
Nomu|โนมุ
Oboro Shirakumo|ชิราคุโมะ
`) },
  { id: 'ablc', name: '⚔️ ตัวละครบลีช', words: L(`
Ichigo Kurosaki|อิจิโกะ|คุโรซากิ อิจิโกะ
Rukia Kuchiki|รุเคีย
Orihime Inoue|โอริฮิเมะ
Uryu Ishida|อุริว|อิชิดะ
Yasutora Sado|ชาด|Chad|ซาโดะ
Renji Abarai|เร็นจิ
Byakuya Kuchiki|เบียคุยะ
Kenpachi Zaraki|เคนปาจิ|ซารากิ
Toshiro Hitsugaya|ฮิตสึงายะ|โทชิโร่
Rangiku Matsumoto|รันงิคุ
Kisuke Urahara|อุราฮาระ
Yoruichi Shihoin|โยรุอิจิ
Sosuke Aizen|ไอเซ็น
Gin Ichimaru|อิจิมารุ กิน|อิจิมารุ
Kaname Tosen|โทเซ็น
Shunsui Kyoraku|เคียวราคุ
Jushiro Ukitake|อุคิทาเกะ
Genryusai Yamamoto|ยามาโมโตะ
Soi Fon|ซอยฟง
Mayuri Kurotsuchi|มายูริ
Retsu Unohana|อุโนฮานะ
Sajin Komamura|โคมามูระ
Momo Hinamori|ฮินาโมริ
Izuru Kira|คิระ
Shuhei Hisagi|ฮิซากิ
Ikkaku Madarame|อิกคาคุ
Yumichika Ayasegawa|ยูมิจิกะ
Yachiru Kusajishi|ยาจิรุ
Isshin Kurosaki|อิชชิน
Kon|คอน
Ulquiorra Cifer|อุลคิโอร่า
Grimmjow Jaegerjaquez|กริมจอว์
Nelliel Tu Odelschwanck|เนล
Coyote Starrk|สตาร์ค
Nnoitra Gilga|นอยโทร่า
Yhwach|ยูไฮบาห์|ยูฮาบัค
Shinji Hirako|ฮิราโกะ ชินจิ
Hiyori Sarugaki|ฮิโยริ
Zangetsu|ซันเก็ตสึ
Ganju Shiba|กันจู
Kukaku Shiba|คูคาคุ
Kaien Shiba|ไคเอน
Nanao Ise|นานาโอะ
Tessai|เทสไซ
Kensei Muguruma|มุงุรุมะ
Mashiro Kuna|มาชิโระ
Rojuro Otoribashi|โรส
Love Aikawa|เลิฟ
Lisa Yadomaru|ลิสะ
Hachigen Ushoda|ฮาจิ
Karin Kurosaki|คาริน
Yuzu Kurosaki|ยูซุ
Masaki Kurosaki|มาซากิ
Ryuken Ishida|ริวเคน
Keigo Asano|เคย์โกะ
Mizuiro Kojima|มิซุอิโระ
Tatsuki Arisawa|ทัตสึกิ
Don Kanonji|ดอน คันนอนจิ
Jinta|จินตะ
Ururu|อุรุรุ
Hanataro Yamada|ฮานาทาโร่
Isane Kotetsu|อิซาเนะ
Kiyone Kotetsu|คิโยเนะ
Sentaro Kotsubaki|เซ็นทาโร่
Nemu Kurotsuchi|เนมุ
Marechiyo Omaeda|โอมาเอดะ
Tetsuzaemon Iba|อิบะ
Chojiro Sasakibe|ซาซากิเบะ
Szayelaporro Granz|ซาเยลอาโปโร
Aaroniero Arruruerie|อาโรนิเอโร
Zommari Rureaux|โซมาริ
Yammy Llargo|ยามี่
Baraggan Louisenbairn|บาราแกน
Tier Harribel|ฮาริเบล
Lilynette Gingerbuck|ลิลีเน็ต
Luppi|ลุปปิ
Wonderweiss|วันเดอร์ไวส์
Ichibe Hyosube|อิจิเบ
Senjumaru Shutara|เซ็นจูมารุ
Kirio Hikifune|ฮิกิฟุเนะ
Tenjiro Kirinji|คิรินจิ
Oetsu Nimaiya|นิไมยะ
Jugram Haschwalth|ฮาชวาลท์
Bambietta Basterbine|บัมบิเอตต้า
As Nodt|อัส น็อดท์
Bazz-B|บาซซ์บี
Askin Nakk Le Vaar|แอสกิน
Gremmy Thoumeaux|เกรมมี่
Lille Barro|ลิลล์ บาร์โร
Gerard Valkyrie|เจราร์ด
Quilge Opie|ควิลเก้
Kugo Ginjo|กินโจ
Shukuro Tsukishima|สึกิชิมะ
Riruka Dokugamine|ริรุกะ
Kazui Kurosaki|คาซุย
Ichika Abarai|อิจิกะ
Grand Fisher|แกรนด์ฟิชเชอร์
`) },
  { id: 'ahq', name: '🏐 ตัวละครไฮคิว', words: L(`
Shoyo Hinata|ฮินาตะ|ฮินาตะ โชโย
Tobio Kageyama|คาเงยามะ
Daichi Sawamura|ไดจิ|ซาวามูระ
Koshi Sugawara|ซูกะ|ซูกาวาระ
Asahi Azumane|อาซาฮี
Yu Nishinoya|นิชิโนยะ
Ryunosuke Tanaka|ทานากะ
Kei Tsukishima|สึกิชิมะ
Tadashi Yamaguchi|ยามากุจิ
Chikara Ennoshita|เอ็นโนชิตะ
Kiyoko Shimizu|คิโยโกะ
Hitoka Yachi|ยาจิ
Keishin Ukai|อุไค
Ittetsu Takeda|ทาเคดะ
Toru Oikawa|โออิคาวะ
Hajime Iwaizumi|อิวาอิซึมิ
Kenma Kozume|เคนมะ
Tetsuro Kuroo|คุโระ|คุโร่
Lev Haiba|เลฟ
Morisuke Yaku|ยาคุ
Kotaro Bokuto|โบคุโตะ
Keiji Akaashi|อาคาอาชิ
Wakatoshi Ushijima|อุชิจิมะ
Satori Tendo|เท็นโด
Kiyoomi Sakusa|ซาคุสะ
Atsumu Miya|อัตสึมุ
Osamu Miya|โอซามุ
Shinsuke Kita|คิตะ
Korai Hoshiumi|โฮชิอุมิ
Kanji Koganegawa|โคกาเนะงาวะ
Kenji Futakuchi|ฟุตาคุจิ
Yuji Terushima|เทรุชิมะ
Kentaro Kyotani|เคียวทานิ
Taketora Yamamoto|ยามาโมโตะ ทาเคโทระ
Saeko Tanaka|ซาเอโกะ
Kazuhito Narita|นาริตะ
Hisashi Kinoshita|คิโนชิตะ
Ikkei Ukai|ปู่อุไค|อุไค อิคเคย์
Makoto Shimada|ชิมาดะ
Yusuke Takinoue|ทาคิโนอุเอะ
Akiteru Tsukishima|อาคิเทรุ
Natsu Hinata|นัตสึ
Yui Michimiya|มิจิมิยะ
Nobuyuki Kai|ไค โนบุยูกิ
Shohei Fukunaga|ฟุคุนากะ
So Inuoka|อินุโอกะ
Yuki Shibayama|ชิบายามะ
Manabu Naoi|นาโออิ
Yasufumi Nekomata|เนโคมาตะ
Alisa Haiba|อลิซ่า
Akane Yamamoto|อาคาเนะ
Akinori Konoha|โคโนฮะ
Tatsuki Washio|วาชิโอะ
Haruki Komi|โคมิ
Yamato Sarukui|ซารุคุอิ
Wataru Onaga|โอนากะ
Yukie Shirofuku|ชิโรฟุคุ
Issei Matsukawa|มัตสึคาวะ
Takahiro Hanamaki|ฮานามากิ
Shinji Watari|วาตาริ
Yutaro Kindaichi|คินไดจิ
Akira Kunimi|คุนิมิ
Shigeru Yahaba|ยาฮาบะ
Eita Semi|เซมิ
Kenjiro Shirabu|ชิราบุ
Reon Ohira|โอฮิระ
Hayato Yamagata|ยามากาตะ
Taichi Kawanishi|คาวานิชิ
Tsutomu Goshiki|โกชิกิ
Tanji Washijo|วาชิโจ
Rintaro Suna|สึนะ
Ren Omimi|โอมิมิ
Aran Ojiro|โอจิโระ
Michinari Akagi|อาคางิ
Hitoshi Ginjima|กินจิมะ
Motoya Komori|โคโมริ โมโตยะ
Tsukasa Iizuna|อิอิซุนะ
Sachiro Hirugami|ฮิรุงามิ
Yudai Hyakuzawa|ฮยาคุซาวะ
Takanobu Aone|อาโอเนะ
Kaname Moniwa|โมนิวะ
Kosuke Sakunami|ซาคุนามิ
Daisuke Nakashima|นากาชิมะ
Suguru Daisho|ไดโช
Miwa Kageyama|มิวะ
`) },
  { id: 'apkm', name: '⚡ โปเกมอน', words: L(`
Pikachu|พิคาชู
Raichu|ไรชู
Pichu|พิชู
Bulbasaur|ฟุชิงิดาเนะ
Ivysaur|ฟุชิงิโซ
Venusaur|ฟุชิงิบานะ
Charmander|ฮิโตคาเงะ
Charmeleon|ลิซาร์โดะ
Charizard|ลิซาร์ดอน
Squirtle|เซนิงาเมะ
Wartortle|คาเมล
Blastoise|คาเม็กซ์
Caterpie|คาตาปี้
Butterfree|บัตเตอร์ฟรี
Pidgey|ป็อปโปะ
Rattata|โครัตตา
Jigglypuff|พูริน
Meowth|เนียซ
Psyduck|โคดัก
Vulpix|โรค่อน
Ninetales|คิวคอน
Growlithe|การ์ดี
Arcanine|วินดี
Abra|เคซีย์
Kadabra|ยุนเกเลอร์
Alakazam|ฟูดิน
Machop|วันริกี
Machamp|ไคริกี
Geodude|อิชิซึบูเตะ
Onix|อิวาร์ค
Slowpoke|ยาดง
Gastly|โกส
Haunter|โกสท์
Gengar|เก็งกา
Cubone|คาราคาระ
Hitmonlee|ซาวามูลาร์
Hitmonchan|เอบิวาลาร์
Lickitung|เบโรรินกา
Chansey|ลัคกี้
Scyther|สไตรค์
Magikarp|คอยคิง
Gyarados|เกียราดอส
Lapras|ลาปลาซ
Ditto|เมตามอน
Eevee|อีวุย
Vaporeon|ชาวเวอร์ส
Jolteon|ธันเดอร์ส
Flareon|บูสเตอร์
Espeon|เอเฟีย
Umbreon|แบล็คกี้
Leafeon|ลีเฟีย
Glaceon|เกลเซีย
Sylveon|นิมเฟีย
Snorlax|คาบิก้อน
Articuno|ฟรีเซอร์
Zapdos|ธันเดอร์
Moltres|ไฟเยอร์
Dratini|มินิริว
Dragonite|ไคริว
Mewtwo|มิวทู
Mew|มิว
Chikorita|ชิโครีตา
Cyndaquil|ฮิโนอาราชิ
Totodile|วานิโนโกะ
Togepi|โทเงปี
Marill|มาริล
Lugia|ลูเกีย
Ho-Oh|โฮโอ
Celebi|เซเลบี
Treecko|คิโมริ
Torchic|อาชาโม
Mudkip|มิซึโกโร
Groudon|กราดอน
Kyogre|ไคออกา
Rayquaza|เรคควอซา
Turtwig|นาเอเทิล
Chimchar|ฮิโกะซารุ
Piplup|โพจจามะ
Lucario|ลูคาริโอ
Garchomp|กาบุเรียส
Greninja|เก็คโคกะ
Rowlet|โมคุโร
Litten|เนียบี
Popplio|อาชิมาริ
Mimikyu|มิมิคคิว
Clefairy|ปิปปี
Zubat|ซูแบท
Diglett|ดิกดา
Ponyta|โพนีตา
Magnemite|คอยล์
Farfetch'd|คาโมเนกิ
Voltorb|บิริริดามะ
Koffing|โดกาส
Staryu|ฮิโตเดมัน
Starmie|สตาร์มี
Mr. Mime|บาเรียด
Electabuzz|เอเลบู
Magmar|บูเบอร์
Tauros|เคนทารอส
Aerodactyl|พเทอรา
Porygon|โพลีกอน
Pidgeot|พิเจียต
Ekans|อาร์โบ
Arbok|อาร์บ็อก
Paras|พารัส
Weedle|บีเดิล
Beedrill|สเปียร์
Togekiss|โทเกคิส
Wobbuffet|โซนาโนะ
Zacian|ซาเชียน
Zamazenta|ซามาเซนตา
`) },
];
