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
`) },
];
