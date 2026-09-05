/* 시즈오카 여행 — 앱 로직
   · 지도 + 일정 시트를 한 화면에 (peek 3행 / 끌어올리면 전체)
   · 보급형 안드로이드 고려: 맛집 마커는 Canvas circleMarker
*/
(function () {
'use strict';

var DATA = {"days":[{"id":1,"color":"#173355","theme":"시즈오카시 (가족 동행)","date":"9/4 (금)","stops":[{"t":"09:00","name":"시즈오카공항 도착","lat":34.796474,"lng":138.185322,"cat":"이동","note":"인천 07:05 출발 → 09:00 도착"},{"t":"10:00~10:30","name":"Hotel Associa 짐 맡기기","lat":34.972974,"lng":138.389852,"cat":"이동","note":"공항 리무진 약 55분 · 역 북쪽 출구 앞 · 체크인 14:00"},{"t":"11:00","name":"점심 — 와사비 타마루야 코야마치점","lat":34.973093,"lng":138.385869,"cat":"식사","note":"와사비동·와사비 요리 · 10:00~19:00 · 자리 없으면 카레우동 푠키치 (도보 2분)"},{"t":"12:30","name":"Hug Coffee 오테마치점","lat":34.976669,"lng":138.384847,"cat":"카페","note":"시즈오카시 역사박물관 안 · 화~일 9:00~18:00 (월 휴무) · 슨푸성 전망 · 다음 일정까지 도보 1분"},{"t":"13:00","name":"현청 별관 21층 전망로비 & 슨푸성공원","lat":34.976895,"lng":138.383828,"cat":"관광","note":"전망로비 무료 · 슨푸성공원 360엔 · 모미지야마 정원 150엔"},{"t":"14:15","name":"오가와 오뎅","lat":34.979106,"lng":138.378084,"cat":"식사","note":"슨푸성에서 도보 7분 · 센겐도리 · 개당 100엔대 · 10:00~17:00 마감 (수 휴무)"},{"t":"15:00","name":"나나야 시즈오카점","lat":34.974256,"lng":138.383684,"cat":"간식","note":"말차 젤라또 7단계 (No.7 강추) · 11:00~19:00 · 수요일 휴무"},{"t":"15:20","name":"焼き立てメロンパン ここのつ","lat":34.974197,"lng":138.383194,"cat":"빵집","note":"멜론빵 전문 · 11:00~18:00 · 나나야에서 도보 1분"},{"t":"15:45","name":"이세탄 시즈오카 · 츠타야 서점","lat":34.974867,"lng":138.380991,"cat":"쇼핑","note":"이세탄 10:00~19:00 · 츠타야 8:00~21:00"},{"t":"16:30","name":"T's green omachi","lat":34.971742,"lng":138.379582,"cat":"카페","note":"튀김당고 · 17:00 마감이라 이 시간대에"},{"t":"16:50","name":"ROSSi Roastery and Cafe","lat":34.972241,"lng":138.378694,"cat":"카페","note":"도보 1분 · 2층 · 12:00~20:00 · 수요일 휴무"},{"t":"17:30","name":"아오바 거리 ~ 도키와 공원","lat":34.970214,"lng":138.380284,"cat":"관광","note":"분수 있는 산책로 · 저녁 무렵 조명"},{"t":"18:00","name":"허그커피 코야마치","lat":34.972406,"lng":138.385014,"cat":"카페","note":"9:00~24:00 · 좌석 적어 테이크아웃 추천"},{"t":"18:40","name":"저녁 — 카레우동 푠키치","lat":34.972833,"lng":138.385087,"cat":"식사","note":"11:30~22:00 · 현금 발권기 · 小 사이즈 가능 · 자리 없으면 スパーゴ紺屋町店 (도보 1분 · SUGIZEN빌딩 2층 · 19:20 마감 · 054-253-4030)"},{"t":"20:00","name":"아오바 오뎅거리 · 聖羅 (선택)","lat":34.971645,"lng":138.381313,"cat":"식사","note":"오가와에서 오뎅 먹었으면 생략 · 지역 사케 다양"}],"iso":"2026-09-04"},{"id":2,"color":"#26617F","theme":"시미즈","date":"9/5 (토)","stops":[{"t":"09:00","name":"시즈오카역 상가에서 아침","lat":34.971746,"lng":138.388898,"cat":"식사","note":"간단하게 먹고 역 안 구경"},{"t":"10:00","name":"PART COFFEE ROASTER","lat":34.973563,"lng":138.387251,"cat":"카페"},{"t":"11:00","name":"다이소 · Standard Products","lat":34.974354,"lng":138.387513,"cat":"쇼핑","note":"10:00~21:00"},{"t":"11:30","name":"Kirigane 소바 + 텐동","lat":34.977276,"lng":138.389176,"cat":"식사","note":"11:30 오픈 · 11:15 도착 권장 · 월요일 휴무"},{"t":"12:30","name":"GOOD TIMING TEA","lat":34.97652,"lng":138.389597,"cat":"카페","note":"8:00~21:00 무휴"},{"t":"대안","name":"CHATO MATCHA & BAKERY","lat":34.976403,"lng":138.387887,"cat":"카페","alt":true,"note":"자리 없거나 다른 곳 원할 때 · 도보 2분 · 목~월 11:00~17/18:00 (화·수 휴무) · 말차 라떼·젤라또 · 현금만"},{"t":"13:30","name":"신시즈오카역 → 신시미즈역","lat":34.975783,"lng":138.387355,"cat":"이동","note":"시즈테츠 약 20분 · 편도 350엔"},{"t":"14:00","name":"시미즈 어시장 (카시노이치)","lat":35.021981,"lng":138.49065,"cat":"관광"},{"t":"15:00","name":"新清水 정류장 → 東折戸 하차","lat":35.017061,"lng":138.487872,"cat":"이동","note":"三保山の手線 (清水駅~水族館三保車庫前行)"},{"t":"15:30","name":"미호노마츠바라","lat":34.994753,"lng":138.522324,"cat":"관광","note":"東折戸 하차 후 도보 · 소나무 그늘 사이로 후지산"},{"t":"17:00","name":"스시 — 시미즈 스시 요코초","lat":35.010533,"lng":138.492745,"cat":"식사","note":"또는 Tomoe Sushi (17:00 오픈 · 신시미즈역 근처)"},{"t":"18:00","name":"시미즈 → 시즈오카","lat":34.971746,"lng":138.388898,"cat":"이동","note":"JR 약 12분"},{"t":"19:30","name":"12-twelve (West Coast Brewing)","lat":34.973294,"lng":138.386433,"cat":"식사","note":"양조장"}],"iso":"2026-09-05"},{"id":3,"color":"#2F7566","theme":"후지노미야 · 고리키군","date":"9/6 (일)","stops":[{"t":"08:00","name":"시즈오카역 → 후지역","lat":35.151497,"lng":138.651213,"cat":"이동","note":"JR 약 590엔"},{"t":"09:00","name":"후지 시청 전망대","lat":35.161466,"lng":138.676249,"cat":"관광","note":"무료 전망 라운지 · 주말은 개방 여부 확인 필요"},{"t":"10:00","name":"Arabica Coffee Fuji Midoricho","lat":35.160002,"lng":138.680496,"cat":"카페"},{"t":"10:30~11:00","name":"후지노미야역 이동 · 고리키군 오후권 교환","lat":35.221409,"lng":138.614942,"cat":"이동","note":"이동 약 40분 · 북쪽 출구 매표소 · 선착순 33명 정원"},{"t":"11:30","name":"오미야요코초 — 후지노미야 야키소바","lat":35.224836,"lng":138.610111,"cat":"식사","note":"10:00~17:00 · 야외 푸드코트"},{"t":"대안","name":"富士宮焼きそば＆ステーキ FUJIBOKU","lat":35.224976,"lng":138.610023,"cat":"식사","alt":true,"note":"도보 1분 · 11:30~15:00, 17:00~21:30 (수 휴무) · 브랜드 돼지 스테이크"},{"t":"12:10","name":"Edoya Honten 江戸屋本店","lat":35.225241,"lng":138.610001,"cat":"카페","note":"빵집 겸 카페 · 9:00~17:00 (수 휴무) · 자가배전 커피 · 카드 가능 · 센겐타이샤 옆"},{"t":"대안","name":"후지산 세계유산센터","lat":35.22378,"lng":138.608858,"cat":"관광","alt":true,"note":"카페 대신 들를 경우 · 도보 3분"},{"t":"12:40","name":"후지노미야역 복귀","lat":35.221409,"lng":138.614942,"cat":"이동","note":"13:00 버스 출발 전 도착"},{"t":"13:00~17:10","name":"고리키군 오후 코스 (버스)","lat":35.221409,"lng":138.614942,"cat":"관광","note":"소요 4시간 10분 · 승하차는 후지노미야역만 · 토·일·공휴일 운행"},{"t":"코스","name":"시라이토노타키 白糸の滝","lat":35.312867,"lng":138.587441,"cat":"관광","sub":true},{"t":"코스","name":"타누키코 田貫湖","lat":35.34187,"lng":138.563249,"cat":"관광","sub":true},{"t":"코스","name":"히토아나 후지코 유적 人穴富士講遺跡","lat":35.361556,"lng":138.591209,"cat":"관광","sub":true,"note":"세계유산 구성자산 · 가이드 동반 시에만 동굴 입장"},{"t":"코스","name":"후지 밀크랜드 富士ミルクランド","lat":35.340536,"lng":138.594184,"cat":"간식","sub":true,"note":"아사기리 고원 우유 젤라또 · 염소 먹이주기"},{"t":"코스","name":"후지 타카사고주조 富士高砂酒造","lat":35.228472,"lng":138.606593,"cat":"관광","sub":true,"note":"1820년 창업 · 후지산 복류수 사케 · 매실주·요구르트주"},{"t":"코스","name":"후지산 혼구 센겐타이샤","lat":35.227487,"lng":138.610026,"cat":"관광","sub":true,"note":"전국 1300여 센겐신사의 총본궁 → 17:10 역 복귀"},{"t":"17:30","name":"시즈오카 복귀","lat":34.971746,"lng":138.388898,"cat":"이동","note":"18:40 도착"},{"t":"19:00","name":"저녁 — 시즈오카 올스타 푸드코트","lat":34.974103,"lng":138.387532,"cat":"식사","note":"11:00~21:00 (목 휴무) · 일요일 영업 · 자이안 카츠카레 등 여러 가게"},{"t":"대안","name":"카레우동 푠키치","lat":34.972833,"lng":138.385087,"cat":"식사","alt":true,"note":"도보 3분 · 매일 11:30~22:00 · 현금 발권기 · 小 사이즈 가능"},{"t":"20:00","name":"아오바 오뎅거리 · 로망","lat":34.971571,"lng":138.381484,"cat":"식사","note":"일요일 영업 (금~화 16:00~24:00) · 다국어 메뉴 · 지역 사케"}],"iso":"2026-09-06"},{"id":4,"color":"#7A4E97","theme":"출국일","date":"9/7 (월)","stops":[{"t":"10:00","name":"체크아웃 (짐은 호텔 보관)","lat":34.972974,"lng":138.389852,"cat":"이동"},{"t":"11:00","name":"焼津港みなみ — 참치덮밥","lat":34.969171,"lng":138.388063,"cat":"식사","note":"11:00~14:00 · 호텔에서 도보 8분 · 11:15 전 도착 권장"},{"t":"12:15","name":"크레페 — ママんトコ！","lat":34.969556,"lng":138.393341,"cat":"간식","note":"도보 5분"},{"t":"13:00","name":"ESORA COFFEE","lat":34.977326,"lng":138.388673,"cat":"카페","note":"고민가 개조 · 자가배전 · 월 11:00~18:00 (목·금 휴무) · 소금캐러멜 빙수 · 호텔까지 도보 6분"},{"t":"대안","name":"Hard Off Shizuoka Mabuchi","lat":34.963976,"lng":138.391219,"cat":"쇼핑","alt":true,"note":"카페 대신 구경할 경우 · 매일 10:00~20:00 · 역 남쪽 1km(도보 13분) · 1층 책·게임, 2층 악기·레코드"},{"t":"14:30","name":"호텔에서 짐 찾기","lat":34.972974,"lng":138.389852,"cat":"이동"},{"t":"15:15","name":"공항 리무진 → 16:06 도착","lat":34.796474,"lng":138.185322,"cat":"이동","note":"18:10 시즈오카공항 출발 → 20:25 인천 도착 · IC카드/컨택리스 필요"}],"iso":"2026-09-07"}],"food":[{"n":"GOOD TIMING TEA","c":"카페","lat":34.9765198,"lng":138.3895971,"r":4.7,"h":"매일 8:00~21:00","m":"찻집 · 무휴라 제일 유연"},{"n":"허그커피 입선요코초점","c":"카페","lat":34.9698934,"lng":138.3893513,"r":4.8,"h":"매일 9:00~17:00","m":"골목 안 아담한 카페 · 앙코버터베이글"},{"n":"하그커피 니시몬초점 (로스터리)","c":"카페","lat":34.9688608,"lng":138.3819619,"r":4.9,"h":"매일 10:00~17:00","m":"자가배전 · 3층 좌석"},{"n":"CHATO MATCHA & BAKERY","c":"카페","lat":34.976403,"lng":138.387887,"r":4.4,"h":"목~월 11:00~17/18:00 (화·수 휴무)","m":"말차 라떼·젤라또 · 현금만"},{"n":"T's green omachi","c":"카페","lat":34.9717417,"lng":138.3795817,"r":4.3,"h":"매일 11:00~17:00","m":"튀김당고 세트"},{"n":"Tandem Jive","c":"카페","lat":34.9707552,"lng":138.380149,"r":4.7,"h":"목~화 15:00~24:00 (수 휴무)","m":"에스프레소 바 · 카운터 3~4석"},{"n":"ESORA COFFEE","c":"카페","lat":34.9773262,"lng":138.3886727,"r":4.5,"h":"토~수 11:00~18:00 (목·금 휴무)","m":"고민가 개조 · 자가배전"},{"n":"Topology Coffee","c":"카페","lat":34.969242,"lng":138.3779343,"r":3.9,"h":"매일 8:00~24:00","m":"베이글 맛집 · 2층 신사 뷰"},{"n":"St.Marc Cafe 아오이타워점","c":"카페","lat":34.972537,"lng":138.386701,"r":3.7,"h":"매일","m":"역 지하도 직결 · 작업하기 좋음"},{"n":"PART COFFEE ROASTER","c":"카페","lat":34.973563,"lng":138.387251,"r":4.5,"h":"","m":"커피 로스터리"},{"n":"나나야 시즈오카점","c":"간식","lat":34.9742559,"lng":138.3836835,"r":4.3,"h":"목~화 11:00~19:00 (수 휴무)","m":"말차 젤라또 7단계 · No.7 강추"},{"n":"ママんトコ！","c":"간식","lat":34.969556,"lng":138.393341,"r":4.6,"h":"","m":"크레페"},{"n":"葵クレープ","c":"간식","lat":34.9759144,"lng":138.3865288,"r":3.3,"h":"매일 11:00~19:00","m":"토핑 직접 고르는 크레페"},{"n":"Citta Crepe & Gelato","c":"간식","lat":34.9734854,"lng":138.3857373,"r":3.9,"h":"매일 11:00~19:00 (금·토 21:00)","m":"크레페 · 젤라또"},{"n":"CAT & BAKES 9456","c":"빵집","lat":34.9776044,"lng":138.3899399,"r":4.7,"h":"목~월 9:00~17:00 (화·수 휴무)","m":"고양이 모양 빵 · 굿즈"},{"n":"日々ブロート","c":"빵집","lat":34.9754138,"lng":138.3815313,"r":4.4,"h":"화~금 11:00~18:00 (토·일·월 휴무)","m":"베이글 샌드 · 대기 20~30분"},{"n":"焼き立てメロンパン ここのつ","c":"빵집","lat":34.9741973,"lng":138.3831944,"r":4.3,"h":"매일 11:00~18:00","m":"멜론빵 전문 · 카드 가능"},{"n":"Boul'ange 신시즈오카 세노바","c":"빵집","lat":34.9755194,"lng":138.3871332,"r":4.0,"h":"매일 8:00~20:00","m":"크루아상 · 지하 1층"},{"n":"マロン","c":"빵집","lat":34.9760221,"lng":138.3769202,"r":3.9,"h":"월~토 7:00~19:00 (일 휴무)","m":"아침 일찍 여는 동네 빵집"},{"n":"一花坊","c":"빵집","lat":34.9708107,"lng":138.3800181,"r":4.8,"h":"화~목 11:00~16:00만","m":"타르트 전문 · 영업일 적음"},{"n":"아오바 오뎅거리 · 로망","c":"오뎅","lat":34.9715709,"lng":138.381484,"r":4.5,"h":"금~화 16:00~24:00 (수·목 휴무)","m":"외국인 친절 · 다국어 메뉴"},{"n":"아오바 오뎅거리 · 聖羅","c":"오뎅","lat":34.9716446,"lng":138.3813127,"r":4.7,"h":"","m":"지역 사케 다양 · 친절"},{"n":"아오바 오뎅거리 · ひので","c":"오뎅","lat":34.9716302,"lng":138.3813897,"r":4.7,"h":"목~월 16:30~26:00 (화·수 휴무)","m":"리뷰 편차 큼 · 참고"},{"n":"Ogawa 오뎅","c":"오뎅","lat":34.9791058,"lng":138.3780843,"r":4.2,"h":"목~화 10:00~17:00 (수 휴무)","m":"센겐도리 · 레트로 · 개당 100엔대"},{"n":"Kobayashi","c":"오뎅","lat":34.972601,"lng":138.385137,"r":4.4,"h":"월~토 17:30~23:00 (일 휴무)","m":"구이류가 훌륭 · 한국어 응대"},{"n":"Kirigane 소바","c":"식사","lat":34.977276,"lng":138.389176,"r":4.2,"h":"11:30 오픈 (월 휴무)","m":"11:15 도착 권장"},{"n":"데우치소바 타가타","c":"식사","lat":34.9701604,"lng":138.381541,"r":4.3,"h":"화~일 11:30~14:00, 17:30~21:00 (월 휴무)","m":"시내 최고급 소바"},{"n":"토가쿠시 소바 고후쿠초점","c":"식사","lat":34.9750544,"lng":138.3819877,"r":4.2,"h":"11:00~20:00 (목 휴무)","m":"이세탄 맞은편"},{"n":"一本氣蕎麦","c":"식사","lat":34.9683783,"lng":138.3953524,"r":4.2,"h":"화~일 11:00~14:00, 17:00~21:00 (월 휴무)","m":"역 남쪽 · 인기 소바"},{"n":"카레우동 푠키치","c":"식사","lat":34.9728329,"lng":138.3850865,"r":4.5,"h":"매일 11:30~22:00","m":"현금 발권기 · 小 사이즈 가능"},{"n":"돈카츠 히나타","c":"식사","lat":34.9720104,"lng":138.3834787,"r":4.4,"h":"11:00~14:00, 17:00~20:30 (화 휴무)","m":"카드 가능 · 예약 권장"},{"n":"톤키 (미소카츠)","c":"식사","lat":34.9716814,"lng":138.3917674,"r":3.9,"h":"월~토 11:00~14:00, 17:00~21:00 (일 휴무)","m":"⚠️일요일 휴무 · 미소카츠 · 역 남쪽"},{"n":"Supago 코야마치점 (スパーゴ紺屋町店)","c":"식사","lat":34.9734872,"lng":138.3858427,"r":3.9,"h":"화~금 11:00~14:20, 17:00~19:20 / 토·일 11:00~14:00, 17:00~19:20 (월 휴무)","m":"함박스테이크 · SUGIZEN빌딩 2층 · 인기 많아 금방 만석 · 054-253-4030"},{"n":"花より、ハンバーグ。ASTY점","c":"식사","lat":34.9713437,"lng":138.3889567,"r":4.3,"h":"매일 11:00~15:00, 17:00~22:30","m":"직접 굽는 함박 · 세트 리필"},{"n":"텐몬혼텐 (텐푸라·우나기)","c":"식사","lat":34.9722309,"lng":138.3801712,"r":4.3,"h":"11:00~14:30, 17:00~21:00 (수 휴무)","m":"영어 메뉴 있음 · 우나기"},{"n":"이시마츠교자 ASTY점","c":"식사","lat":34.9715723,"lng":138.3885936,"r":3.8,"h":"매일 11:00~22:00","m":"하마마츠 교자 · 태블릿 주문"},{"n":"しずおか魚市場直営店 ASTY","c":"식사","lat":34.9718103,"lng":138.3893683,"r":4.2,"h":"매일 11:00~14:00, 16:00~22:00","m":"카이센동 1,100엔~"},{"n":"다시차즈케 엔 ASTY점","c":"식사","lat":34.9713437,"lng":138.3889567,"r":4.0,"h":"매일 7:30~22:00","m":"아침도 가능 · 오차즈케"},{"n":"串かつ クシゾー","c":"식사","lat":34.9751692,"lng":138.3898145,"r":3.5,"h":"월~토 17:00~23:00 (일 휴무)","m":"쿠시카츠 · 2개 이상 주문"},{"n":"이자카야 타카노","c":"식사","lat":34.972494,"lng":138.3852855,"r":4.2,"h":"월~토 16:30~22:00 (일 휴무)","m":"오래된 이자카야 · 합리적"},{"n":"焼津港みなみ (야이즈코 미나미)","c":"식사","lat":34.969171,"lng":138.388063,"r":4.5,"h":"11:00~14:00, 17:30~21:30","m":"참치덮밥 · 11:15 전 도착"},{"n":"시즈오카 올스타 푸드코트","c":"식사","lat":34.9741029,"lng":138.3875324,"r":3.1,"h":"매일 11:00~21:00","m":"자이안 카츠카레 입점 · 小 가능"},{"n":"시미즈 스시요코초","c":"식사","lat":35.010533,"lng":138.492745,"r":3.7,"h":"","m":"드림플라자 내 스시 거리"},{"n":"Sushi Dokoro Takao","c":"식사","lat":35.0167811,"lng":138.4890678,"r":4.5,"h":"수~일 17:00~27:00 (월·화 휴무)","m":"늦게까지 영업"},{"n":"미호노마츠바라","c":"관광","lat":34.994753,"lng":138.522324,"r":4.2,"h":"","m":"소나무 그늘 · 후지산 조망"},{"n":"FUJIBOKU (야키소바·스테이크)","c":"식사","lat":35.2249763,"lng":138.6100227,"r":4.3,"h":"11:30~15:00, 17:00~21:30 (수 휴무)","m":"세계유산센터 근처 · 브랜드 돼지"},{"n":"오미야 요코초","c":"식사","lat":35.2248363,"lng":138.6101105,"r":4.0,"h":"매일 10:00~17:00","m":"야외 푸드코트 · 후지산 용수"},{"n":"후지노미야 야키소바 안테나숍","c":"식사","lat":35.2249561,"lng":138.6101868,"r":3.9,"h":"10:00~16:30 (수 13:00, 일 15:00)","m":"보통 450엔 · 오미야요코초 내"},{"n":"Sagami (오코노미야키)","c":"식사","lat":35.2229101,"lng":138.6189793,"r":4.7,"h":"매일 11:00~14:00, 16:00~19:00","m":"할머니 가게 · 매우 저렴"},{"n":"니지야미미","c":"식사","lat":35.2232289,"lng":138.6143577,"r":4.2,"h":"11:00~15:00, 16:30~19:00 (화 휴무)","m":"로마자 메뉴 · 7~8석"},{"n":"Osakaya (철판구이)","c":"식사","lat":35.2273435,"lng":138.6153146,"r":4.2,"h":"10:00~15:30 (화 휴무)","m":"시구레야키 · 오코노미야키"},{"n":"크레프야상 토모시비","c":"간식","lat":35.2243044,"lng":138.6147309,"r":3.9,"h":"목~월 12:00~19:00 (화·수 휴무)","m":"바삭한 대형 크레페 · 5분 소요"},{"n":"후지산 세계유산센터","c":"관광","lat":35.22378,"lng":138.608858,"r":4.3,"h":"","m":"박물관"},{"n":"Arabica Coffee Fuji Midoricho","c":"카페","lat":35.160002,"lng":138.680496,"r":4.3,"h":"","m":"후지시"},{"n":"SIDE COFFEE (미용실 안 카페)","c":"카페","lat":35.1602988,"lng":138.6777498,"r":4.7,"h":"매일 10:00~18:00","m":"후지시 · PayPay 가능"},{"n":"釜忠 (카마메시)","c":"식사","lat":35.1617628,"lng":138.6994847,"r":4.5,"h":"11:00~14:00, 16:00~19:30 (화 휴무)","m":"후지시 · 가마솥밥"},{"n":"후지산 꿈의 대교","c":"관광","lat":35.1514403,"lng":138.6760618,"r":4.3,"h":"24시간","m":"후지산 뷰 포토스팟 · 대기 있음"},{"n":"무인양품 시즈오카 파르코","c":"쇼핑","lat":34.9727881,"lng":138.3857974,"r":3.9,"h":"매일 10:30~19:30","m":"7층 · 면세 없음"},{"n":"MUJI 500 ASTY점","c":"쇼핑","lat":34.9714665,"lng":138.3880109,"r":4.5,"h":"매일 10:00~20:00","m":"500엔 이하 위주 · 역 안"},{"n":"Standard Products","c":"쇼핑","lat":34.9743537,"lng":138.387513,"r":4.4,"h":"매일 10:00~21:00","m":"다이소 계열 · 다이소 내부"},{"n":"타마루야 본점 파르셰점","c":"쇼핑","lat":34.9721624,"lng":138.3887604,"r":4.0,"h":"매일 9:30~20:00","m":"와사비즈케 오미야게 · 역 안"},{"n":"Hard Off Shizuoka Mabuchi","c":"쇼핑","lat":34.963976,"lng":138.391219,"r":3.4,"h":"","m":"중고품 판매점"},{"n":"슨푸성 모미지야마 정원","c":"관광","lat":34.9799706,"lng":138.384936,"r":4.4,"h":"화~일 9:00~16:00 (월 휴관)","m":"150엔 · 차실 포함"},{"n":"시즈오카 현청 별관 21층 전망로비","c":"관광","lat":34.976895,"lng":138.383828,"r":4.3,"h":"","m":"무료 후지산 전망"},{"n":"Hug Coffee 오테마치점","c":"카페","lat":34.976669,"lng":138.384847,"r":4.2,"h":"화~일 9:00~18:00 (월 휴무)","m":"역사박물관 안 · 슨푸성 전망 · 영어 응대 · 셰이크류 평 좋음"},{"n":"허그커피 코야마치","c":"카페","lat":34.972406,"lng":138.385014,"r":4.4,"h":"매일 9:00~24:00","m":"시내 중심 · 좌석 적음 · 테이크아웃 좋음"},{"n":"ROSSi Roastery and Cafe","c":"카페","lat":34.972241,"lng":138.378694,"r":4.6,"h":"12:00~20:00 (수 휴무, 일 18:00)","m":"2층 · 좁은 계단 · 티라미수"},{"n":"Tomoe Sushi","c":"식사","lat":35.015553,"lng":138.486933,"r":4.4,"h":"매일 17:00~26:00","m":"신시미즈역 근처 · 메뉴판 없이 예산 말하고 주문"},{"n":"이세탄 시즈오카","c":"쇼핑","lat":34.974867,"lng":138.380991,"r":3.7,"h":"매일 10:00~19:00","m":"백화점 · 지하 식품관 추천"},{"n":"츠타야 서점 시즈오카","c":"쇼핑","lat":34.975785,"lng":138.380341,"r":3.7,"h":"매일 8:00~21:00","m":"스타벅스 병설 · 앉아서 쉬기 좋음"},{"n":"와사비 타마루야 코야마치점","c":"쇼핑","lat":34.973093,"lng":138.385869,"r":4.2,"h":"매일 10:00~19:00","m":"시내 중심 · 와사비동·소프트아이스크림 · 오미야게"},{"n":"도키와 공원","c":"관광","lat":34.970214,"lng":138.380284,"r":3.9,"h":"24시간","m":"아오바 거리 끝 · 분수 · 주변 카페 많음"},{"n":"후지 시청 전망대","c":"관광","lat":35.161466,"lng":138.676249,"r":3.6,"h":"평일 8:30~17:15 (주말 휴무)","m":"무료 전망 라운지 · 후지산 조망"},{"n":"Edoya Honten 江戸屋本店","c":"카페","lat":35.225241,"lng":138.610001,"r":4.1,"h":"매일 9:00~17:00 (수 휴무)","m":"빵집 겸 카페 · 자가배전 커피 · 센겐타이샤 옆 · 카드 가능"},{"n":"居酒屋 しぞ～か 魚to畑 本店","c":"식사","lat":34.970314,"lng":138.390724,"r":4.6,"h":"화~토 17:00~23:00 (일·월 휴무)","m":"⚠️일요일 휴무 · 유이항 직송 사시미 · TK빌딩 지하 · 예약 권장"},{"n":"呑み処いけちゃん","c":"식사","lat":34.969921,"lng":138.389399,"r":4.6,"h":"월~토 17:00~22:00 (일 휴무)","m":"⚠️일요일 휴무 · 6~7석 · 한국어 메뉴 있음 · 부부가 운영"}]};
var DAYS = DATA.days, FOOD = DATA.food;

var CAT_COLOR  = {"이동":"#4E6E8A","식사":"#D8632F","간식":"#C25D86","빵집":"#A8703F",
                  "카페":"#9A7635","관광":"#2F7566","쇼핑":"#66727F"};
var FOOD_COLOR = {"카페":"#9A7635","간식":"#C25D86","빵집":"#A8703F",
                  "식사":"#D8632F","오뎅":"#8A4E32","쇼핑":"#66727F","관광":"#2F7566"};
var CAT_ORDER  = ["카페","간식","빵집","오뎅","식사","관광","쇼핑"];

function $(id){ return document.getElementById(id); }
function esc(s){ return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function gmaps(lat,lng){
  return "https://www.google.com/maps/dir/?api=1&destination="+lat+","+lng+"&travelmode=walking";
}
function dayById(id){ return DAYS.filter(function(d){ return d.id===id; })[0]; }

/* ---------- 접속한 날짜에 맞는 Day 고르기 ----------
   여행 중이면 오늘 날짜, 여행 전이면 첫날, 끝난 뒤면 마지막 날.
   ?day=2 처럼 붙이면 강제로 지정 (미리 확인용). */
function localISO(dt){
  var y=dt.getFullYear(), m=dt.getMonth()+1, d=dt.getDate();
  return y + "-" + (m<10?"0":"") + m + "-" + (d<10?"0":"") + d;
}
var TODAY_ISO = localISO(new Date());

function initialDayId(){
  var q = /[?&]day=(\d+)/.exec(location.search);
  if (q){
    var n = parseInt(q[1],10);
    if (dayById(n)) return n;
  }
  var hit = DAYS.filter(function(d){ return d.iso === TODAY_ISO; })[0];
  if (hit) return hit.id;
  if (TODAY_ISO < DAYS[0].iso) return DAYS[0].id;
  if (TODAY_ISO > DAYS[DAYS.length-1].iso) return DAYS[DAYS.length-1].id;
  return DAYS[0].id;
}
function isToday(d){ return d.iso === TODAY_ISO; }

/* ---------- 번호 매기기: 본 일정은 1,2,3… / 대안은 5-1, 5-2 ---------- */
function stopLabels(day){
  var out=[], main=0, subN=0;
  day.stops.forEach(function(s){
    if (s.alt || s.sub){ subN++; out.push(main + "-" + subN); }
    else { main++; subN=0; out.push(String(main)); }
  });
  return out;
}

/* ---------- 연결 상태 ---------- */
function netUpdate(){
  var d = $('netdot');
  if (navigator.onLine){ d.classList.remove('off'); d.title="온라인"; }
  else { d.classList.add('off'); d.title="오프라인 — 저장된 내용으로 보는 중"; }
}
window.addEventListener('online', netUpdate);
window.addEventListener('offline', netUpdate);

/* ---------- 날짜 버튼 ---------- */
function buildDaybar(el, current, onPick){
  el.innerHTML = "";
  DAYS.forEach(function(d){
    var b = document.createElement('button');
    b.type = "button";
    b.className = "dbtn" + (d.id===current ? " on" : "");
    b.setAttribute('role','tab');
    b.setAttribute('aria-selected', d.id===current ? "true":"false");
    b.innerHTML = "Day " + d.id + (isToday(d) ? "<span class='todaydot'>오늘</span>" : "") +
                  "<span class='dd'>" + esc(d.date) + "</span>";
    if (isToday(d)) b.classList.add('today');
    b.addEventListener('click', function(){ onPick(d.id); });
    el.appendChild(b);
  });
}

/* ---------- 일정 행 HTML ---------- */
function stopHTML(s, i, day, label){
  var col = CAT_COLOR[s.cat] || day.color;
  var alt = !!s.alt, sub = !!s.sub, ind = alt || sub;
  return "<div class='stop" + (ind ? " altrow" : "") + (sub ? " subrow" : "") + "' data-i='" + i + "'>" +
           "<div class='no" + (ind ? " altno" : "") + "' style='" +
             (ind ? "color:" + col + ";border-color:" + col : "background:" + col) + "'>" +
             (label || (i+1)) + "</div>" +
           "<div class='bd'>" +
             "<div class='tm'>" +
                (alt ? "<span class='altlabel'>대안</span> " : "") +
                (sub ? "<span class='altlabel sublabel'>코스</span> " : "") +
                esc(ind ? s.cat : s.t + " · " + s.cat) + "</div>" +
             "<div class='nm'>" + esc(s.name) + "</div>" +
             (s.note ? "<div class='nt'>" + esc(s.note) + "</div>" : "") +
             "<a class='go' href='" + gmaps(s.lat,s.lng) + "' target='_blank' rel='noopener'>길찾기</a>" +
           "</div></div>";
}

/* ================= 일정 전체 탭 ================= */
var planDay = initialDayId();
function renderPlan(){
  buildDaybar($('daybar'), planDay, function(id){ planDay=id; renderPlan(); });
  var d = dayById(planDay);
  var h = "<div class='dayhead'><h2>Day " + d.id + " · " + esc(d.theme) + "</h2>" +
          "<div class='dt'>" + esc(d.date) + "</div></div>";
  var LB = stopLabels(d);
  d.stops.forEach(function(s,i){ h += stopHTML(s,i,d,LB[i]); });
  $('planBody').innerHTML = h;
}

/* ================= 맛집 탭 ================= */
var activeCat = {};
CAT_ORDER.forEach(function(c){ activeCat[c]=true; });

function renderChips(){
  var el = $('chips'); el.innerHTML = "";
  CAT_ORDER.forEach(function(cat){
    var n = FOOD.filter(function(f){ return f.c===cat; }).length;
    if(!n) return;
    var b = document.createElement('button');
    b.type="button";
    b.className = "chip" + (activeCat[cat] ? " on" : "");
    if(activeCat[cat]) b.style.background = FOOD_COLOR[cat];
    b.textContent = cat + " " + n;
    b.addEventListener('click', function(){
      activeCat[cat] = !activeCat[cat];
      b.classList.toggle('on', activeCat[cat]);
      b.style.background = activeCat[cat] ? FOOD_COLOR[cat] : "#fff";
      renderFoodList();
      if (foodOn) drawFood();
    });
    el.appendChild(b);
  });
}

function renderFoodList(){
  var list = FOOD.filter(function(f){ return activeCat[f.c]; });
  if(!list.length){ $('foodBody').innerHTML = "<div class='empty'>선택된 분류가 없어요.</div>"; return; }
  var h = "";
  list.forEach(function(f){
    var col = FOOD_COLOR[f.c] || "#666";
    h += "<div class='fcard'><div class='r1'>" +
           "<span class='cat' style='background:" + col + "'>" + esc(f.c) + "</span>" +
           "<span class='nm'>" + esc(f.n) + "</span>" +
           (f.r ? "<span class='rt'>★ " + f.r + "</span>" : "") +
         "</div>" +
         (f.h ? "<div class='hr'>🕘 " + esc(f.h) + "</div>" : "") +
         (f.m ? "<div class='mm'>" + esc(f.m) + "</div>" : "") +
         "<a class='go' href='" + gmaps(f.lat,f.lng) + "' target='_blank' rel='noopener'>길찾기</a>" +
         "</div>";
  });
  $('foodBody').innerHTML = h;
}

/* ================= 지도 + 시트 ================= */
var map=null, tiles=null, dayLayer=null, foodLayer=null, meMarker=null, canvasRenderer=null;
var mapDay=initialDayId(), foodOn=false, mapReady=false, dayMarkers=[], selected=-1;
var TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

function sheetPeekPx(){
  var v = getComputedStyle(document.documentElement).getPropertyValue('--peek');
  return parseInt(v,10) || 238;
}

function initMap(){
  if (mapReady){ setTimeout(function(){ map.invalidateSize(); }, 60); return; }

  map = L.map('map', { zoomControl:false, preferCanvas:true, tap:true })
         .setView([34.99,138.42], 11);
  tiles = L.tileLayer(TILE_URL, {
    maxZoom:18, minZoom:8, crossOrigin:true, attribution:'&copy; OpenStreetMap'
  }).addTo(map);

  canvasRenderer = L.canvas({ padding:0.4 });
  dayLayer  = L.layerGroup().addTo(map);
  foodLayer = L.layerGroup();

  rebuildMapDaybar();
  mapReady = true;
  drawDay(true);
  setTimeout(function(){ map.invalidateSize(); }, 80);
}

function rebuildMapDaybar(){
  buildDaybar($('mapDaybar'), mapDay, function(id){
    mapDay = id; selected = -1;
    rebuildMapDaybar(); drawDay(true);
  });
}

/* 지도 + 시트 목록을 함께 갱신 */
function drawDay(fit){
  if(!mapReady) return;
  dayLayer.clearLayers();
  dayMarkers = [];
  var d = dayById(mapDay);
  var LB = stopLabels(d);

  /* 경로선은 본 일정만 잇는다 (대안으로 선이 새지 않게) */
  var mainPts = d.stops.filter(function(s){ return !s.alt; })
                       .map(function(s){ return [s.lat,s.lng]; });
  L.polyline(mainPts, {color:d.color, weight:4, opacity:.85, dashArray:"1,9", lineCap:"round"})
   .addTo(dayLayer);

  d.stops.forEach(function(s,i){
    var col = CAT_COLOR[s.cat] || d.color;

    /* 대안은 직전 본 일정과 얇은 점선으로 연결 */
    if (s.alt && !s.sub && i > 0){
      for (var j=i-1; j>=0; j--){
        if (!d.stops[j].alt){
          L.polyline([[d.stops[j].lat,d.stops[j].lng],[s.lat,s.lng]],
            {color:col, weight:2, opacity:.55, dashArray:"3,6"}).addTo(dayLayer);
          break;
        }
      }
    }

    var isIndent = s.alt || s.sub;
    var pinHTML = isIndent
      ? "<div class='num-pin alt' style='color:"+col+";border-color:"+col+"'><span>"+LB[i]+"</span></div>"
      : "<div class='num-pin' style='background:"+d.color+"'><span>"+LB[i]+"</span></div>";

    var m = L.marker([s.lat,s.lng], {
      icon: L.divIcon({ className:"", html:pinHTML,
        iconSize:[30,30], iconAnchor:[15,28], popupAnchor:[0,-26] })
    }).bindPopup(
      "<div class='pp-c' style='color:"+col+"'>"+
        (s.alt ? "대안 · "+esc(s.cat)
               : s.sub ? "고리키군 코스 · "+esc(s.cat)
                       : esc(s.t)+" · "+esc(s.cat))+"</div>"+
      "<div class='pp-n'>"+LB[i]+". "+esc(s.name)+"</div>"+
      (s.note ? "<div class='pp-t'>"+esc(s.note)+"</div>" : "")+
      "<a class='pp-l' href='"+gmaps(s.lat,s.lng)+"' target='_blank' rel='noopener'>📍 길찾기</a>"
    ).addTo(dayLayer);
    m.on('click', function(){ selectStop(i, false); });
    dayMarkers.push(m);
  });

  renderSheetList(d);
  if (fit) fitDay();
}

function fitDay(){
  var d = dayById(mapDay);
  var pts = d.stops.map(function(s){ return [s.lat,s.lng]; });
  var pad = $('sheet').classList.contains('open')
            ? Math.round(window.innerHeight * 0.72)
            : sheetPeekPx();
  map.fitBounds(L.latLngBounds(pts), {
    paddingTopLeft:[24, 62],           /* 위쪽 날짜 pill 자리 */
    paddingBottomRight:[24, pad + 16]  /* 아래쪽 시트 자리 */
  });
}

function renderSheetList(d){
  var h = "";
  var LB = stopLabels(d);
  d.stops.forEach(function(s,i){ h += stopHTML(s,i,d,LB[i]); });
  var el = $('stopList');
  el.innerHTML = h;
  Array.prototype.forEach.call(el.querySelectorAll('.stop'), function(row){
    row.addEventListener('click', function(e){
      if (e.target && e.target.classList.contains('go')) return;
      selectStop(parseInt(row.dataset.i,10), true);
    });
  });
}

/* 목록 ↔ 지도 연동 */
function selectStop(i, fromList){
  selected = i;
  var d = dayById(mapDay), s = d.stops[i];

  Array.prototype.forEach.call($('stopList').querySelectorAll('.stop'), function(r){
    r.classList.toggle('sel', parseInt(r.dataset.i,10) === i);
  });

  if (fromList){
    var off = $('sheet').classList.contains('open') ? 0 : 0.28;
    map.setView([s.lat + off * 0.004, s.lng], Math.max(map.getZoom(), 15), {animate:true});
    if (dayMarkers[i]) dayMarkers[i].openPopup();
  } else {
    var row = $('stopList').querySelector(".stop[data-i='"+i+"']");
    if (row) row.scrollIntoView({block:'nearest', behavior:'smooth'});
  }
}

function drawFood(){
  foodLayer.clearLayers();
  FOOD.forEach(function(f){
    if(!activeCat[f.c]) return;
    var col = FOOD_COLOR[f.c] || "#666";
    L.circleMarker([f.lat,f.lng], {
      renderer:canvasRenderer, radius:7, weight:2,
      color:"#fff", fillColor:col, fillOpacity:1
    }).bindPopup(
      "<div class='pp-c' style='color:"+col+"'>"+esc(f.c)+(f.r?" · ★"+f.r:"")+"</div>"+
      "<div class='pp-n'>"+esc(f.n)+"</div>"+
      (f.h ? "<div class='pp-t'>🕘 "+esc(f.h)+"</div>" : "")+
      (f.m ? "<div class='pp-t'>"+esc(f.m)+"</div>" : "")+
      "<a class='pp-l' href='"+gmaps(f.lat,f.lng)+"' target='_blank' rel='noopener'>📍 길찾기</a>"
    ).addTo(foodLayer);
  });
}

/* ---------- 시트 열고 닫기 (탭 + 드래그) ---------- */
var sheet, grip;
function setSheet(open){
  sheet.classList.toggle('open', open);
  grip.setAttribute('aria-expanded', open ? "true" : "false");
  $('gripText').textContent = open ? "아래로 내리면 지도 넓게" : "위로 올리면 전체 일정";
  $('view-map').classList.toggle('sheetopen', open);
  setTimeout(function(){ if(map) map.invalidateSize(); }, 240);
}

function initSheet(){
  sheet = $('sheet'); grip = $('grip');
  grip.addEventListener('click', function(){
    setSheet(!sheet.classList.contains('open'));
  });

  var y0 = null;
  function start(e){ y0 = (e.touches ? e.touches[0].clientY : e.clientY); }
  function end(e){
    if (y0 === null) return;
    var y1 = (e.changedTouches ? e.changedTouches[0].clientY : e.clientY);
    var dy = y1 - y0;
    y0 = null;
    if (Math.abs(dy) < 24) return;      /* 짧으면 탭으로 처리 */
    setSheet(dy < 0);                   /* 위로 끌면 열기 */
  }
  grip.addEventListener('touchstart', start, {passive:true});
  grip.addEventListener('touchend', end, {passive:true});
  grip.addEventListener('mousedown', start);
  grip.addEventListener('mouseup', end);
}

/* ---------- 지도 타일 미리 저장 ---------- */
function lon2x(lon,z){ return Math.floor((lon+180)/360*Math.pow(2,z)); }
function lat2y(lat,z){
  var r = lat*Math.PI/180;
  return Math.floor((1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*Math.pow(2,z));
}
function tileListForBounds(b, zooms){
  var out=[];
  zooms.forEach(function(z){
    var x1=lon2x(b[1],z), x2=lon2x(b[3],z), y1=lat2y(b[2],z), y2=lat2y(b[0],z);
    for(var x=Math.min(x1,x2); x<=Math.max(x1,x2); x++)
      for(var y=Math.min(y1,y2); y<=Math.max(y1,y2); y++)
        out.push(TILE_URL.replace("{z}",z).replace("{x}",x).replace("{y}",y));
  });
  return out;
}
var SAVE_AREAS = [
  [34.9840,138.3720, 34.9640,138.3990],
  [35.0250,138.4830, 34.9900,138.5280],
  [35.2320,138.6030, 35.2180,138.6220],
  [35.1650,138.6700, 35.1480,138.7020],
  [34.9400,138.3740, 34.9280,138.3880]
];
var SAVE_ZOOMS=[13,14,15,16], SAVE_CAP=900;
function uniq(a){ var s={}; return a.filter(function(v){ if(s[v]) return false; s[v]=1; return true; }); }

function prefetchTiles(){
  var btn=$('btnSave'), note=$('saveNote'), bar=$('saveBar'), fill=$('saveFill');
  if(!navigator.onLine){ note.textContent = "인터넷에 연결된 상태에서 눌러주세요."; return; }

  var urls=[];
  SAVE_AREAS.forEach(function(b){ urls = urls.concat(tileListForBounds(b, SAVE_ZOOMS)); });
  urls = uniq(urls).slice(0, SAVE_CAP);

  btn.disabled = true; bar.hidden = false;
  var done=0, fail=0, i=0, CONC=4;
  function step(){
    if(i >= urls.length) return Promise.resolve();
    var url = urls[i++];
    return fetch(url, {mode:'cors', cache:'force-cache'})
      .catch(function(){ fail++; })
      .then(function(){
        done++;
        fill.style.width = Math.round(done/urls.length*100) + "%";
        note.textContent = "저장 중… " + done + " / " + urls.length;
        return new Promise(function(r){ setTimeout(r,30); }).then(step);
      });
  }
  var ws=[]; for(var w=0; w<CONC; w++) ws.push(step());
  Promise.all(ws).then(function(){
    btn.disabled = false;
    note.textContent = fail > urls.length/3
      ? "일부만 저장됐어요. 신호가 좋은 곳에서 한 번 더 눌러주세요."
      : "저장 완료. 이제 오프라인에서도 이 지역 지도가 보여요.";
    setTimeout(function(){ bar.hidden = true; fill.style.width = "0"; }, 2500);
  });
}

/* ================= 화면 전환 ================= */
var VIEWS = { map:'view-map', plan:'view-plan', food:'view-food' };
function show(v){
  Object.keys(VIEWS).forEach(function(k){ $(VIEWS[k]).hidden = (k !== v); });
  Array.prototype.forEach.call(document.querySelectorAll('.tab'), function(t){
    var on = t.dataset.v === v;
    t.classList.toggle('on', on);
    t.setAttribute('aria-selected', on ? "true" : "false");
  });
  if (v === 'map') initMap();
}
Array.prototype.forEach.call(document.querySelectorAll('.tab'), function(t){
  t.addEventListener('click', function(){ show(t.dataset.v); });
});

$('btnFit').addEventListener('click', function(){ fitDay(); });

$('btnFood').addEventListener('click', function(){
  foodOn = !foodOn;
  this.setAttribute('aria-pressed', foodOn ? "true":"false");
  if (foodOn){ foodLayer.addTo(map); drawFood(); } else { map.removeLayer(foodLayer); }
});

$('btnLoc').addEventListener('click', function(){
  if(!navigator.geolocation){ alert("이 기기에서는 위치를 쓸 수 없어요."); return; }
  var b = this; b.textContent = "…";
  navigator.geolocation.getCurrentPosition(function(p){
    b.textContent = "📍";
    if(meMarker) map.removeLayer(meMarker);
    meMarker = L.marker([p.coords.latitude,p.coords.longitude], {
      icon: L.divIcon({className:"", html:"<div class='me-dot'></div>",
                       iconSize:[18,18], iconAnchor:[9,9]})
    }).addTo(map);
    map.setView([p.coords.latitude,p.coords.longitude], 16);
  }, function(){
    b.textContent = "📍";
    alert("위치를 가져오지 못했어요. 설정에서 위치 권한과 GPS를 확인해주세요.");
  }, {enableHighAccuracy:true, timeout:10000, maximumAge:60000});
});

$('btnSave').addEventListener('click', prefetchTiles);

window.addEventListener('resize', function(){
  if (map) setTimeout(function(){ map.invalidateSize(); }, 120);
});

/* ================= 시작 ================= */
netUpdate();
initSheet();
renderPlan();
renderChips();
renderFoodList();
show('map');

})();
