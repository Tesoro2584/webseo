import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Star, Home, Utensils, Bus, CheckCircle2, Bed, Navigation, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import './index.css';

const heroImages = [
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Hanoi_Skyline_-_NKS.jpg/1280px-Hanoi_Skyline_-_NKS.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg/1280px-V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/56/KHAU_PH%E1%BA%A0_M%C3%99A_N%C6%AF%E1%BB%9AC_%C4%90%E1%BB%94_-_panoramio.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Co_do_Hoa_Lu_112.JPG/1280px-Co_do_Hoa_Lu_112.JPG',
  'https://upload.wikimedia.org/wikipedia/commons/6/62/Quang_c%E1%BA%A3nh_th%C3%A0nh_ph%E1%BB%91_Hu%E1%BA%BF_nh%C3%ACn_t%E1%BB%AB_S%C3%B4ng_H%C6%B0%C6%A1ng.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg/1280px-B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Da_Lat_-_Viet_Nam.jpg/1280px-Da_Lat_-_Viet_Nam.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Ho_Chi_Minh_City_Skyline_at_Night.jpg/1280px-Ho_Chi_Minh_City_Skyline_at_Night.jpg',
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Phu_Quoc%2C_Viet_Nam.jpg/1280px-Phu_Quoc%2C_Viet_Nam.jpg'
];

const roomImages = [
  'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=400',
];

const generateRooms = (basePrice: number) => [
  { type: 'Phòng Standard (Giường Đôi)', price: `${(basePrice).toLocaleString('vi-VN')}đ`, image: roomImages[0], amenities: ['Wifi miễn phí', 'Điều hòa', 'View thành phố'] },
  { type: 'Phòng Deluxe (Ban công)', price: `${(basePrice * 1.5).toLocaleString('vi-VN')}đ`, image: roomImages[1], amenities: ['Bữa sáng miễn phí', 'Ban công view đẹp', 'Bồn tắm'] },
  { type: 'Phòng Suite Gia Đình', price: `${(basePrice * 2).toLocaleString('vi-VN')}đ`, image: roomImages[2], amenities: ['2 Giường đôi', 'Phòng khách riêng', 'Đưa đón sân bay'] },
];

const regions = [
  {
    name: 'Miền Bắc',
    desc: 'Cảnh sắc núi non hùng vĩ, mây mù bao phủ và những ruộng bậc thang tuyệt đẹp.',
    destinations: [
      {
        id: 'mb1',
        name: 'Sapa, Lào Cai',
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sapa_Terraces.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/d/de/C%C3%A1p-treo-fansipan-17.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/5/56/KHAU_PH%E1%BA%A0_M%C3%99A_N%C6%AF%E1%BB%9AC_%C4%90%E1%BB%94_-_panoramio.jpg'
        ],
        desc: 'Thành phố trong sương với những thửa ruộng bậc thang tuyệt mỹ.',
        info: { stay: 'Resort 5 sao, Homestay bản Cát Cát.', food: 'Lợn cắp nách, Cá hồi Sapa.', transport: 'Xe giường nằm, Tàu hỏa.' },
        hotels: [
          { name: 'Hotel de la Coupole - MGallery', rating: 5, price: '3.200.000đ', reviews: 1250, desc: 'Tuyệt hảo - Cách trung tâm 200m', reviewsList: [{u: 'Anh Tuấn', c: 'Kiến trúc tuyệt đẹp, nhân viên 5 sao.'}, {u: 'Chị Mai', c: 'Bữa sáng buffet rất đa dạng.'}], rooms: generateRooms(3200000) },
          { name: 'Sapa Jade Hill Resort & Spa', rating: 5, price: '1.800.000đ', reviews: 890, desc: 'Rất tốt - Khung cảnh thung lũng', reviewsList: [{u: 'Gia đình Hưng', c: 'View thung lũng Mường Hoa rất thơ mộng.'}], rooms: generateRooms(1800000) },
          { name: 'Pistachio Hotel Sapa', rating: 4, price: '1.500.000đ', reviews: 1100, desc: 'Tuyệt vời - Bể bơi vô cực', reviewsList: [{u: 'Hải Đăng', c: 'Bể bơi trên mái siêu đẹp chụp hình cực thích.'}], rooms: generateRooms(1500000) },
          { name: 'Sapa Horizon Hotel', rating: 4, price: '950.000đ', reviews: 740, desc: 'Tốt - Ngay trung tâm', reviewsList: [{u: 'Thảo', c: 'Gần chợ tiện đi lại.'}], rooms: generateRooms(950000) }
        ],
        tours: [
          { 
            name: 'Săn mây Fansipan 3N2Đ', price: '3.500.000đ', rating: 4.8,
            image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/C%C3%A1p-treo-fansipan-17.jpg',
            itinerary: ['Ngày 1: Hà Nội - Sapa - Bản Cát Cát', 'Ngày 2: Chinh phục đỉnh Fansipan - Thác Bạc', 'Ngày 3: Núi Hàm Rồng - Trở về Hà Nội'],
            transport: 'Xe Limousine 9 chỗ đưa đón tận nơi tại Hà Nội. Tại Sapa có xe điện trung chuyển đến Ga Cáp Treo.',
            detailedItinerary: [
              { day: 'Ngày 1: Hà Nội - Sapa - Bản Cát Cát', details: 'Xe Limousine đón quý khách tại điểm hẹn khởi hành đi Sapa. Buổi chiều tham quan bản Cát Cát, tìm hiểu văn hóa người H\'Mông, check-in thác Thủy Điện. Tối tự do dạo phố, thưởng thức đồ nướng.' },
              { day: 'Ngày 2: Chinh phục nóc nhà Đông Dương Fansipan', details: 'Trải nghiệm cáp treo 3 dây dài nhất thế giới lên đỉnh Fansipan. Tham quan quần thể tâm linh Bích Vân Thiền Tự. Trưa ăn buffet tại nhà hàng. Chiều ghé thăm Thác Bạc.' },
              { day: 'Ngày 3: Khám phá Núi Hàm Rồng - Về Hà Nội', details: 'Tham quan khu du lịch Hàm Rồng, Vườn Lan, Cổng Trời. Trưa trả phòng và lên xe về lại Hà Nội. Kết thúc hành trình.' }
            ]
          },
          { 
            name: 'Trekking Tả Van - Lao Chải', price: '1.200.000đ', rating: 4.9,
            image: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sapa_Terraces.jpg',
            itinerary: ['Ngày 1: Khám phá bản Lao Chải - Tả Van', 'Ngày 2: Trải nghiệm ẩm thực địa phương - Về lại thị trấn'],
            transport: 'Xe trung chuyển 16 chỗ từ Thị Trấn Sapa xuống bản. Đi bộ Trekking 10km.',
            detailedItinerary: [
              { day: 'Ngày 1: Thị trấn Sapa - Bản Lao Chải - Tả Van', details: 'Bắt đầu hành trình Trekking 10km xuyên qua thung lũng Mường Hoa. Chiêm ngưỡng những thửa ruộng bậc thang tuyệt đẹp. Chiều đến bản Tả Van, nhận phòng Homestay và cùng nấu ăn với gia chủ.' },
              { day: 'Ngày 2: Tả Van - Rừng trúc - Trở về', details: 'Thức dậy trong sương sớm, ăn sáng và uống trà. Trekking qua khu rừng trúc hoang sơ, tắm suối. Sau bữa trưa, xe trung chuyển sẽ đưa đoàn trở về thị trấn.' }
            ]
          }
        ]
      },
      {
        id: 'mb2',
        name: 'Vịnh Hạ Long, Quảng Ninh',
        images: [
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg/1280px-V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/1/17/H%E1%BA%A1_Long_Bay_viewed_from_Ti_T%E1%BB%91p_Island.jpg',
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/%C3%82u_c%E1%BA%A3ng.jpg/1280px-%C3%82u_c%E1%BA%A3ng.jpg'
        ],
        desc: 'Di sản thiên nhiên thế giới với hàng ngàn hòn đảo đá vôi.',
        info: { stay: 'Du thuyền 5 sao, Khách sạn Bãi Cháy.', food: 'Chả mực, Bề bề, Hải sản.', transport: 'Cao tốc Hà Nội - Hải Phòng.' },
        hotels: [
          { name: 'Vinpearl Resort Hạ Long', rating: 5, price: '2.500.000đ', reviews: 2100, desc: 'Xuất sắc - Nằm biệt lập trên đảo', reviewsList: [{u: 'Tuấn', c: 'Riêng tư, bãi biển rất sạch.'}], rooms: generateRooms(2500000) },
          { name: 'FLC Halong Bay', rating: 5, price: '2.100.000đ', reviews: 1540, desc: 'Tuyệt vời - Tầm nhìn panorama', reviewsList: [{u: 'Ly', c: 'Bể bơi view thẳng ra Vịnh.'}], rooms: generateRooms(2100000) },
          { name: 'Wyndham Legend Halong', rating: 5, price: '1.900.000đ', reviews: 1800, desc: 'Rất tốt - Gần Sun World', reviewsList: [{u: 'Huy', c: 'Phòng rộng, bữa sáng ngon.'}], rooms: generateRooms(1900000) },
          { name: 'Novotel Ha Long Bay', rating: 4, price: '1.400.000đ', reviews: 920, desc: 'Tốt - Đối diện biển', reviewsList: [{u: 'An', c: 'Đi lại tiện lợi.'}], rooms: generateRooms(1400000) }
        ],
        tours: [
          { 
            name: 'Du thuyền Vịnh Hạ Long 2N1Đ', price: '4.500.000đ', rating: 5.0,
            image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg/1280px-V%E1%BB%8Bnh_H%E1%BA%A1_Long_-_NKS.jpg',
            itinerary: ['Ngày 1: Lên du thuyền - Thăm hang Sửng Sốt', 'Ngày 2: Đảo Ti Tốp - Về bến'],
            transport: 'Đón khách bằng Limousine tại Hà Nội. Du thuyền 5 sao Stellar of the Seas đưa đón trên Vịnh.',
            detailedItinerary: [
              { day: 'Ngày 1: Tuần Châu - Vịnh Hạ Long - Hang Sửng Sốt', details: 'Đón khách tại bến Tuần Châu, làm thủ tục lên du thuyền 5 sao. Ăn trưa buffet trên tàu. Buổi chiều tham quan Hang Sửng Sốt - hang động đẹp nhất Vịnh. Chèo Kayak tại khu vực Hang Luồn. Tối thưởng thức tiệc BBQ hải sản trên Sundeck.' },
              { day: 'Ngày 2: Đảo Ti Tốp - Về bến', details: 'Đón bình minh và tập Thái Cực Quyền trên boong tàu. Tham quan đảo Ti Tốp, tự do bơi lội hoặc leo núi ngắm toàn cảnh Vịnh. Thưởng thức bữa trưa nhẹ trước khi cập bến.' }
            ]
          }
        ]
      },
      {
        id: 'mb3',
        name: 'Tà Xùa, Sơn La',
        images: [
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/S%E1%BB%91ng_l%C6%B0ng_kh%E1%BB%A7ng_long_T%C3%A0_X%C3%B9a.jpg/1280px-S%E1%BB%91ng_l%C6%B0ng_kh%E1%BB%A7ng_long_T%C3%A0_X%C3%B9a.jpg',
          'https://images.pexels.com/photos/773471/pexels-photo-773471.jpeg?auto=compress&cs=tinysrgb&w=1000',
          'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=1000'
        ],
        desc: 'Thiên đường săn mây bồng bềnh giữa núi rừng Tây Bắc.',
        info: { stay: 'Homestay Tà Xùa, Camping đỉnh núi.', food: 'Gà nướng, Cơm lam.', transport: 'Xe khách đi Bắc Yên.' },
        hotels: [
          { name: 'Tà Xùa Clouds Homestay', rating: 4, price: '800.000đ', reviews: 450, desc: 'Tuyệt vời - Săn mây tại phòng', reviewsList: [{u: 'Hằng', c: 'Mở cửa ra là thấy mây.'}], rooms: generateRooms(800000) },
          { name: 'Trịnh Gia Homestay', rating: 3, price: '500.000đ', reviews: 320, desc: 'Tốt - Gần sống lưng khủng long', reviewsList: [{u: 'Bình', c: 'Đồ ăn ngon.'}], rooms: generateRooms(500000) },
          { name: 'Tà Xùa Lu Trế', rating: 4, price: '950.000đ', reviews: 200, desc: 'Xuất sắc - Bungalow gỗ', reviewsList: [{u: 'Nam', c: 'View tuyệt đẹp.'}], rooms: generateRooms(950000) },
          { name: 'Mùa Trứ Homestay', rating: 3, price: '450.000đ', reviews: 150, desc: 'Khá - Yêu tĩnh', reviewsList: [{u: 'Nga', c: 'Yên bình.'}], rooms: generateRooms(450000) }
        ],
        tours: [
          { 
            name: 'Camping săn mây Tà Xùa 2N1Đ', price: '1.800.000đ', rating: 4.8,
            image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=800',
            itinerary: ['Ngày 1: Hà Nội - Bắc Yên - Cắm trại', 'Ngày 2: Săn mây sáng sớm - Về lại Hà Nội'],
            transport: 'Xe giường nằm Hà Nội - Bắc Yên. Xe ôm bản địa chở lên đỉnh núi.',
            detailedItinerary: [
              { day: 'Ngày 1: Hà Nội - Bắc Yên - Cắm trại', details: 'Khởi hành từ Hà Nội đi Bắc Yên. Buổi chiều xe ôm bản địa sẽ đưa quý khách lên đỉnh núi. Nhận lều trại (lều 2 lớp, cách nhiệt). Tổ chức tiệc nướng BBQ giữa thiên nhiên, đốt lửa trại.' },
              { day: 'Ngày 2: Sống Lưng Khủng Long - Săn Mây', details: 'Dậy từ 5h sáng đón bình minh và săn biển mây bồng bềnh tại Sống Lưng Khủng Long. Chụp ảnh tự do, uống cafe nóng. Sau đó thu dọn lều trại và di chuyển về.' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Miền Trung',
    desc: 'Khúc ruột miền Trung với những bãi biển đẹp nhất hành tinh và di sản văn hóa cổ kính.',
    destinations: [
      {
        id: 'mt1',
        name: 'Cố đô Huế',
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/6/62/Quang_c%E1%BA%A3nh_th%C3%A0nh_ph%E1%BB%91_Hu%E1%BA%BF_nh%C3%ACn_t%E1%BB%AB_S%C3%B4ng_H%C6%B0%C6%A1ng.jpg',
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/S%C3%B4ng_H%C6%B0%C6%A1ng_%28Hu%E1%BA%BF%29.jpg/1280px-S%C3%B4ng_H%C6%B0%C6%A1ng_%28Hu%E1%BA%BF%29.jpg',
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Annam_-_Hu%C3%A9_-_Pavillons_sur_le_bassin_fleuri_au_Tombeau_de_Tu-Duc.jpg/1280px-Annam_-_Hu%C3%A9_-_Pavillons_sur_le_bassin_fleuri_au_Tombeau_de_Tu-Duc.jpg'
        ],
        desc: 'Vẻ đẹp trầm mặc của quần thể di tích cố đô và nhã nhạc cung đình.',
        info: { stay: 'Khách sạn ven sông Hương.', food: 'Bún bò Huế, Bánh bèo, Chè hẻm.', transport: 'Sân bay Phú Bài, Tàu hỏa.' },
        hotels: [
          { name: 'Silk Path Grand Hue', rating: 5, price: '2.300.000đ', reviews: 1100, desc: 'Tuyệt hảo - Kiến trúc Đông Dương', reviewsList: [{u:'Lâm', c:'Khách sạn rất đẹp'}], rooms: generateRooms(2300000) },
          { name: 'Azerai La Residence', rating: 5, price: '4.500.000đ', reviews: 850, desc: 'Đẳng cấp - View Sông Hương', reviewsList: [{u:'Thúy', c:'Tuyệt vời.'}], rooms: generateRooms(4500000) },
          { name: 'Melia Vinpearl Hue', rating: 5, price: '1.700.000đ', reviews: 1200, desc: 'Hiện đại - Trung tâm', reviewsList: [{u:'Khoa', c:'Phòng view đẹp'}], rooms: generateRooms(1700000) },
          { name: 'Mường Thanh Hue', rating: 4, price: '1.100.000đ', reviews: 900, desc: 'Tốt - Ngay bến phà', reviewsList: [{u:'Châu', c:'Ăn sáng ngon.'}], rooms: generateRooms(1100000) }
        ],
        tours: [
          { 
            name: 'Kinh Thành & 3 Lăng Tẩm', price: '1.500.000đ', rating: 4.9,
            image: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Quang_c%E1%BA%A3nh_th%C3%A0nh_ph%E1%BB%91_Hu%E1%BA%BF_nh%C3%ACn_t%E1%BB%AB_S%C3%B4ng_H%C6%B0%C6%A1ng.jpg',
            itinerary: ['Sáng: Đại Nội Huế', 'Chiều: Lăng Khải Định, Tự Đức, Minh Mạng'],
            transport: 'Xe 16 chỗ đón tại Khách sạn. HDV theo suốt hành trình.',
            detailedItinerary: [
              { day: 'Sáng: Khám phá Đại Nội - Kinh Thành Huế', details: 'HDV dẫn đoàn qua Cửa Ngọ Môn, tham quan Điện Thái Hòa, Tử Cấm Thành, Thế Miếu. Nghe thuyết minh về lịch sử 13 đời vua nhà Nguyễn. Dùng cơm trưa cung đình.' },
              { day: 'Chiều: Viếng thăm 3 Lăng Tẩm nổi tiếng', details: 'Xe đưa đoàn tham quan Lăng Khải Định với kiến trúc Âu - Á kết hợp, Lăng Tự Đức thơ mộng và Lăng Minh Mạng uy nghi. Kết thúc tour tại khách sạn.' }
            ]
          }
        ]
      },
      {
        id: 'mt2',
        name: 'Phố cổ Hội An',
        images: [
          'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/9/94/Hoi_An_Ancient_Town-3.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/2/22/Hoi_An_lanterns_at_night.jpg'
        ],
        desc: 'Thương cảng xưa yên bình với hàng ngàn chiếc đèn lồng rực rỡ.',
        info: { stay: 'Boutique Hotel, Resort.', food: 'Cao lầu, Mì Quảng, Bánh mì Phượng.', transport: 'Từ Đà Nẵng (Taxi, Xe bus).' },
        hotels: [
          { name: 'Four Seasons The Nam Hai', rating: 5, price: '12.000.000đ', reviews: 600, desc: 'Thượng lưu - Trải nghiệm bậc nhất', reviewsList: [{u:'Vinh', c:'Giá cao nhưng hoàn toàn xứng đáng'}], rooms: generateRooms(12000000) },
          { name: 'Hotel Royal Hoi An', rating: 5, price: '3.100.000đ', reviews: 1400, desc: 'Tuyệt hảo - Kế bên sông Thu Bồn', reviewsList: [{u:'Linh', c:'Bể bơi sân thượng cực chill'}], rooms: generateRooms(3100000) },
          { name: 'Anantara Hoi An Resort', rating: 5, price: '4.200.000đ', reviews: 800, desc: 'Tuyệt vời - Kiến trúc Pháp', reviewsList: [{u:'Phong', c:'Rất yên tĩnh và thư giãn'}], rooms: generateRooms(4200000) },
          { name: 'Laluna Hoi An', rating: 4, price: '1.200.000đ', reviews: 1100, desc: 'Tốt - Cách phố cổ 5 phút', reviewsList: [{u:'Thanh', c:'Rất gần trung tâm'}], rooms: generateRooms(1200000) }
        ],
        tours: [
          { 
            name: 'Rừng Dừa Bảy Mẫu & Phố Cổ', price: '650.000đ', rating: 4.8,
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Hoi_An_lanterns_at_night.jpg',
            itinerary: ['Sáng: Chèo thuyền thúng', 'Chiều: Đi xích lô quanh phố cổ'],
            transport: 'Xe 16 chỗ đón tại Đà Nẵng hoặc Hội An.',
            detailedItinerary: [
              { day: 'Sáng: Khám phá Rừng dừa Bảy Mẫu', details: 'Đoàn di chuyển đến Cẩm Thanh, trải nghiệm đi thuyền thúng len lỏi qua các rặng dừa nước. Xem biểu diễn múa thúng, đua thuyền thúng và câu cua.' },
              { day: 'Chiều & Tối: Dạo phố cổ - Thả hoa đăng', details: 'Tham quan Chùa Cầu, các hội quán. Thưởng thức đặc sản Cao Lầu, Mì Quảng. Buổi tối, phố cổ lên đèn lồng rực rỡ, đoàn trải nghiệm ngồi thuyền thả hoa đăng trên sông Thu Bồn.' }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Tây Nguyên & Miền Nam',
    desc: 'Cao nguyên đất đỏ bạt ngàn và vùng biển đảo thiên đường.',
    destinations: [
      {
        id: 'mn1',
        name: 'Đà Lạt, Lâm Đồng',
        images: [
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e2/Da_Lat_-_Viet_Nam.jpg/1280px-Da_Lat_-_Viet_Nam.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/2/29/Da_Lat_Lake.jpg',
          'https://images.pexels.com/photos/1485640/pexels-photo-1485640.jpeg?auto=compress&cs=tinysrgb&w=1000'
        ],
        desc: 'Thành phố ngàn hoa với không khí se lạnh quanh năm.',
        info: { stay: 'Biệt thự cổ, Homestay đồi thông.', food: 'Bánh tráng nướng, Lẩu gà lá é.', transport: 'Sân bay Liên Khương, Xe giường nằm.' },
        hotels: [
          { name: 'Hôtel Colline', rating: 4, price: '1.500.000đ', reviews: 3200, desc: 'Tuyệt vời - Ngay chợ Đà Lạt', reviewsList: [{u:'Khoa', c:'Nằm ngay chợ, tối đi dạo cực đã'}], rooms: generateRooms(1500000) },
          { name: 'Ana Mandara Villas Dalat', rating: 5, price: '2.800.000đ', reviews: 1500, desc: 'Tuyệt hảo - Biệt thự Pháp cổ', reviewsList: [{u:'Trân', c:'Như lạc vào một ngôi làng Pháp thu nhỏ'}], rooms: generateRooms(2800000) },
          { name: 'Dalat Palace Heritage', rating: 5, price: '3.500.000đ', reviews: 800, desc: 'Đẳng cấp - Cổ điển', reviewsList: [{u:'Vũ', c:'Nội thất cổ điển rất sang trọng'}], rooms: generateRooms(3500000) },
          { name: 'Terracotta Resort', rating: 4, price: '1.700.000đ', reviews: 2000, desc: 'Tuyệt vời - Khuôn viên bên Hồ Tuyền Lâm', reviewsList: [{u:'My', c:'Khuôn viên rộng lớn'}], rooms: generateRooms(1700000) }
        ],
        tours: [
          { 
            name: 'Săn mây đồi chè Cầu Đất', price: '500.000đ', rating: 4.8,
            image: 'https://images.pexels.com/photos/1485640/pexels-photo-1485640.jpeg?auto=compress&cs=tinysrgb&w=800',
            itinerary: ['4h Sáng: Đón khách đi Cầu Đất', 'Sáng: Săn mây thảm gỗ'],
            transport: 'Lên đồi bằng xe Jeep hai cầu chuyên dụng.',
            detailedItinerary: [
              { day: 'Sáng sớm: Săn mây thảm gỗ Cầu Đất', details: 'Xe đón quý khách lúc 4h00 sáng. Di chuyển bằng xe Jeep lên đồi chè. Chiêm ngưỡng biển mây tuyệt đẹp từ Thảm Gỗ Săn Mây lúc bình minh. Thưởng thức cafe nóng giữa tiết trời se lạnh.' },
              { day: 'Buổi sáng: Đồi chè & Vườn hồng', details: 'Tham quan nhà máy trà cổ, check-in đồi chè bạt ngàn xanh mướt. Ghé thăm vườn hồng treo gió công nghệ Nhật Bản, nếm thử mứt dâu và trà Atiso.' }
            ]
          }
        ]
      },
      {
        id: 'mn3',
        name: 'Phú Quốc, Kiên Giang',
        images: [
          'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Phu_Quoc%2C_Viet_Nam.jpg/1280px-Phu_Quoc%2C_Viet_Nam.jpg',
          'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1000',
          'https://images.pexels.com/photos/1231330/pexels-photo-1231330.jpeg?auto=compress&cs=tinysrgb&w=1000'
        ],
        desc: 'Đảo ngọc thiên đường với biển xanh, cát trắng và khu nghỉ dưỡng.',
        info: { stay: 'Resort 5 sao.', food: 'Hải sản tươi sống, Bún quậy.', transport: 'Sân bay Phú Quốc.' },
        hotels: [
          { name: 'JW Marriott Phu Quoc', rating: 5, price: '7.500.000đ', reviews: 2500, desc: 'Tuyệt hảo - Đỉnh cao nghỉ dưỡng', reviewsList: [{u:'Minh', c:'Khách sạn đẹp nhất mình từng đi'}], rooms: generateRooms(7500000) },
          { name: 'Vinpearl Resort & Spa', rating: 5, price: '3.500.000đ', reviews: 4100, desc: 'Xuất sắc - Tiện ích vui chơi', reviewsList: [{u:'Lan', c:'Tuyệt vời cho gia đình'}], rooms: generateRooms(3500000) },
          { name: 'InterContinental Phu Quoc', rating: 5, price: '4.800.000đ', reviews: 1800, desc: 'Đẳng cấp - Chuẩn 5 sao', reviewsList: [{u:'Sơn', c:'Rooftop tuyệt đẹp'}], rooms: generateRooms(4800000) },
          { name: 'Sunset Sanato Resort', rating: 4, price: '1.800.000đ', reviews: 2200, desc: 'Rất tốt - Chụp hình hoàng hôn siêu đẹp', reviewsList: [{u:'Quyên', c:'View ngắm mặt trời lặn siêu ảo'}], rooms: generateRooms(1800000) }
        ],
        tours: [
          { 
            name: 'Tour Đảo ngọc 4 Đảo', price: '950.000đ', rating: 4.9,
            image: 'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=800',
            itinerary: ['Sáng: Lặn ngắm san hô', 'Chiều: Hòn Mây Rút - Công viên nước'],
            transport: 'Cano cao tốc 2 máy ra các đảo.',
            detailedItinerary: [
              { day: 'Sáng: Lặn ngắm san hô Hòn Gầm Ghì - Hòn Thơm', details: 'Cano cao tốc đưa đoàn ra khu vực Hòn Gầm Ghì - nơi có rạn san hô tự nhiên đẹp nhất Phú Quốc. Quý khách được trang bị áo phao, kính lặn ống thở (Snorkeling).' },
              { day: 'Chiều: Hòn Mây Rút - Công Viên Nước', details: 'Ăn trưa hải sản trên Hòn Mây Rút Trong. Chụp ảnh check-in cùng ván SUP trong suốt và Flycam miễn phí. Chiều muộn di chuyển sang Công viên nước Aquatopia vui chơi trước khi về bờ.' }
            ]
          }
        ]
      }
    ]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

type Destination = typeof regions[0]['destinations'][0];
type Tour = Destination['tours'][0];
type Hotel = Destination['hotels'][0];

const DestinationImageSlider = ({ images, title }: { images: string[], title: string }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="dest-img-container">
      <AnimatePresence>
        <motion.img 
          key={currentIdx}
          src={images[currentIdx]} 
          alt={title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="slider-img"
          loading="lazy"
        />
      </AnimatePresence>
      <div className="dest-title-overlay">
        <h3>{title}</h3>
        <span className="view-tour-btn">Khám Phá ➔</span>
      </div>
    </div>
  );
};

const ModalHeaderGallery = ({ images, title, transport }: { images: string[], title: string, transport: string }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const nextImg = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIdx((prev) => (prev + 1) % images.length); };
  const prevImg = (e: React.MouseEvent) => { e.stopPropagation(); setCurrentIdx((prev) => (prev - 1 + images.length) % images.length); };

  return (
    <div className="modal-header">
      <AnimatePresence>
        <motion.div 
          key={currentIdx}
          className="modal-header-bg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ backgroundImage: `url(${images[currentIdx]})` }}
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <div className="gallery-controls">
          <button className="gallery-btn" onClick={prevImg}><ChevronLeft size={24}/></button>
          <button className="gallery-btn" onClick={nextImg}><ChevronRight size={24}/></button>
        </div>
      )}

      <div className="modal-header-overlay">
        <h2 className="modal-title">{title}</h2>
        <p><MapPin size={18} style={{ display: 'inline', marginRight: '5px' }}/> {transport}</p>
        
        <div className="gallery-dots">
          {images.map((_, i) => (
            <span key={i} className={`dot ${i === currentIdx ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [activeTab, setActiveTab] = useState<'tours' | 'hotels'>('tours');
  
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);
  const [bookingTour, setBookingTour] = useState<Tour | null>(null);
  
  const [checkoutItem, setCheckoutItem] = useState<{type: 'tour'|'hotel', name: string, price: string, detail?: string} | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [currentHeroBg, setCurrentHeroBg] = useState(0);
  const [hoveredHotel, setHoveredHotel] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroBg((prev) => (prev + 1) % heroImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setCheckoutItem(null);
      setBookingHotel(null);
      setBookingTour(null);
    }, 3000);
  };

  return (
    <>
      <nav className="navbar">
        <a href="#home" onClick={(e) => handleScrollTo(e, 'home')} className="logo">Viet<span>Travel</span></a>
        <div className="nav-links">
          <a href="#home" onClick={(e) => handleScrollTo(e, 'home')}>Trang chủ</a>
          <a href="#regions" onClick={(e) => handleScrollTo(e, 'regions')}>Khám phá</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')}>Liên hệ</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <AnimatePresence>
          <motion.div
            key={currentHeroBg}
            className="hero-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ backgroundImage: `url(${heroImages[currentHeroBg]})` }}
          />
        </AnimatePresence>
        <div className="hero-overlay"></div>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeUp}>Hành Trình Dọc Miền Đất Nước</motion.h1>
          <motion.p variants={fadeUp}>Khám phá dải đất hình chữ S với những tuyệt tác thiên nhiên nguyên bản và nền văn hóa đậm đà bản sắc.</motion.p>
          <motion.div variants={fadeUp}>
            <a href="#regions" onClick={(e) => handleScrollTo(e, 'regions')} className="btn">Khám phá ngay</a>
          </motion.div>
        </motion.div>
      </section>

      <div id="regions" className="regions-container">
        {regions.map((region) => (
          <motion.section 
            className="region-section" 
            key={region.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="region-header" variants={fadeUp}>
              <h2 className="section-title">{region.name}</h2>
              <p className="section-subtitle">{region.desc}</p>
            </motion.div>
            
            <div className="dest-grid">
              {region.destinations.map((dest) => (
                <motion.div 
                  className="dest-card" 
                  key={dest.id}
                  variants={fadeUp}
                  whileHover={{ y: -15 }}
                  onClick={() => {
                    setSelectedDest(dest);
                    setActiveTab('tours');
                  }}
                >
                  <DestinationImageSlider images={dest.images} title={dest.name} />
                  
                  <div className="dest-info">
                    <p className="dest-desc">{dest.desc}</p>
                    <div className="info-group">
                      <div className="info-group-header">
                        <Home size={18} className="info-icon" />
                        <h4>Chỗ ở</h4>
                      </div>
                      <p>{dest.info.stay}</p>
                    </div>
                    <div className="info-group">
                      <div className="info-group-header">
                        <Utensils size={18} className="info-icon" />
                        <h4>Ăn uống</h4>
                      </div>
                      <p>{dest.info.food}</p>
                    </div>
                    <div className="info-group">
                      <div className="info-group-header">
                        <Bus size={18} className="info-icon" />
                        <h4>Đi lại</h4>
                      </div>
                      <p>{dest.info.transport}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      <AnimatePresence>
        {selectedDest && !bookingHotel && !bookingTour && !checkoutItem && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDest(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedDest(null)}>
                <X size={24} />
              </button>
              
              <ModalHeaderGallery 
                images={selectedDest.images} 
                title={selectedDest.name} 
                transport={selectedDest.info.transport} 
              />

              <div className="modal-body">
                <div className="tabs-container">
                  <button 
                    className={`tab-btn ${activeTab === 'tours' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tours')}
                  >
                    <Navigation size={18} /> Gói Tour Khám Phá
                  </button>
                  <button 
                    className={`tab-btn ${activeTab === 'hotels' ? 'active' : ''}`}
                    onClick={() => setActiveTab('hotels')}
                  >
                    <Bed size={18} /> Khách Sạn Đề Xuất
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === 'tours' && (
                    <div className="tours-list">
                      {selectedDest.tours.map((tour, index) => (
                        <div className="item-card" key={index}>
                          <div className="item-image" style={{ backgroundImage: `url(${tour.image})` }}></div>
                          <div className="item-details">
                            <div className="item-header">
                              <h4>{tour.name}</h4>
                              <div className="item-rating">
                                <Star size={14} fill="#FF9A00" color="#FF9A00" />
                                <span>{tour.rating}/5.0</span>
                              </div>
                            </div>
                            
                            <div className="tour-itinerary" style={{ height: 'auto', opacity: 1, marginTop: 10 }}>
                              <h5>Lịch trình tóm tắt:</h5>
                              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#555' }}>
                                {tour.itinerary.map((day, i) => <li key={i} style={{ marginBottom: '5px' }}>{day}</li>)}
                              </ul>
                            </div>
                            
                            <div className="item-footer">
                              <div className="item-price">
                                <span>Chỉ từ</span>
                                <p>{tour.price}</p>
                              </div>
                              <button className="book-btn" onClick={() => setBookingTour(tour)}>XEM CHI TIẾT & ĐẶT</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'hotels' && (
                    <div className="hotels-list">
                      {selectedDest.hotels.map((hotel, index) => (
                        <div 
                          className="item-card hotel-card" 
                          key={index}
                          onMouseEnter={() => setHoveredHotel(index)}
                          onMouseLeave={() => setHoveredHotel(null)}
                        >
                          <div className="item-details" style={{ width: '100%' }}>
                            <div className="item-header">
                              <h4>{hotel.name}</h4>
                              <div className="hotel-stars">
                                {[...Array(hotel.rating)].map((_, i) => (
                                  <Star key={i} size={14} fill="#FF9A00" color="#FF9A00" />
                                ))}
                              </div>
                            </div>
                            <div className="hotel-reviews" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span className="badge">{hotel.rating.toFixed(1)}</span>
                              <span>{hotel.desc}</span>
                              <span className="review-count">({hotel.reviews} đánh giá)</span>
                            </div>
                            
                            <AnimatePresence>
                              {hoveredHotel === index && (
                                <motion.div 
                                  className="review-tooltip"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                >
                                  {hotel.reviewsList.map((rev, i) => (
                                    <div className="review-item" key={i}>
                                      <strong>{rev.u}</strong>
                                      "{rev.c}"
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            <div className="item-footer" style={{ marginTop: '15px' }}>
                              <div className="item-price">
                                <span>Giá mỗi đêm từ</span>
                                <p>{hotel.price}</p>
                              </div>
                              <button className="book-btn" onClick={() => setBookingHotel(hotel)}>CHỌN PHÒNG</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tour Detailed Modal */}
      <AnimatePresence>
        {bookingTour && !checkoutItem && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBookingTour(null)}
          >
            <motion.div 
              className="modal-content booking-modal"
              style={{ maxWidth: '700px' }}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setBookingTour(null)}><X size={24} /></button>
              <h2 style={{ marginBottom: '20px' }}>{bookingTour.name}</h2>
              
              <div className="itinerary-details">
                <h4 style={{ marginBottom: '15px' }}><Info size={18} style={{ display:'inline', marginRight:'5px', verticalAlign:'text-bottom' }}/> Chi tiết lịch trình</h4>
                
                <div className="detailed-itinerary-timeline">
                  {bookingTour.detailedItinerary.map((dayPlan, idx) => (
                    <div key={idx} className="timeline-day">
                      <strong style={{ color: 'var(--accent)', display: 'block', marginBottom: '8px', fontSize: '1.05rem' }}>{dayPlan.day}</strong>
                      <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6', color: '#555', margin: 0, paddingLeft: '15px', borderLeft: '3px solid #eee' }}>
                        {dayPlan.details}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="transport-info">
                  <Bus size={20} />
                  <span>Phương tiện & Đưa đón: {bookingTour.transport}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>Tổng chi phí (1 người):</span>
                  <p style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0' }}>{bookingTour.price}</p>
                </div>
                <button className="book-btn" style={{ padding: '12px 30px' }} onClick={() => setCheckoutItem({type: 'tour', name: bookingTour.name, price: bookingTour.price})}>Xác Nhận Đặt Tour</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hotel Rooms Selection Modal (Agoda style) */}
      <AnimatePresence>
        {bookingHotel && !checkoutItem && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBookingHotel(null)}
          >
            <motion.div 
              className="modal-content booking-modal"
              style={{ maxWidth: '800px', width: '90%' }}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setBookingHotel(null)}><X size={24} /></button>
              <h2>{bookingHotel.name} - Chọn Loại Phòng</h2>
              <p style={{ color: '#666' }}>{bookingHotel.desc}</p>
              
              <div className="hotel-details-container">
                {bookingHotel.rooms.map((room, idx) => (
                  <div className="room-option" key={idx}>
                    <img src={room.image} alt={room.type} className="room-img" />
                    <div className="room-info">
                      <h4>{room.type}</h4>
                      <div className="room-amenities">
                        {room.amenities.map((am, i) => <span key={i}>{am}</span>)}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14}/> Hủy phòng miễn phí</p>
                    </div>
                    <div className="room-price-action">
                      <p>{room.price}</p>
                      <button className="book-btn" onClick={() => setCheckoutItem({type: 'hotel', name: `${bookingHotel.name} - ${room.type}`, price: room.price})}>Đặt Ngay</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Form Modal */}
      <AnimatePresence>
        {checkoutItem && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !bookingSuccess && setCheckoutItem(null)}
          >
            <motion.div 
              className="modal-content booking-modal"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {!bookingSuccess && (
                <button className="close-modal" onClick={() => setCheckoutItem(null)}>
                  <X size={24} />
                </button>
              )}

              {bookingSuccess ? (
                <div className="booking-success">
                  <CheckCircle2 size={64} color="#47663B" />
                  <h2>{checkoutItem.type === 'tour' ? 'Đặt Tour' : 'Đặt Phòng'} Thành Công!</h2>
                  <p>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận yêu cầu cho <strong>{checkoutItem.name}</strong>.</p>
                </div>
              ) : (
                <div className="booking-form-container">
                  <h2>Hoàn Tất Đặt Chỗ</h2>
                  <p>Sản phẩm: <strong>{checkoutItem.name}</strong><br/>Giá: <strong style={{color: 'var(--accent)'}}>{checkoutItem.price}</strong></p>
                  <form className="booking-form" onSubmit={handleBookingSubmit}>
                    <div className="form-group">
                      <label>Họ và Tên</label>
                      <input type="text" placeholder="Nguyễn Văn A" required />
                    </div>
                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input type="tel" placeholder="0901234567" required />
                    </div>
                    <div className="form-group">
                      <label>{checkoutItem.type === 'tour' ? 'Ngày khởi hành' : 'Ngày nhận phòng'}</label>
                      <input type="date" required />
                    </div>
                    <div className="form-group">
                      <label>Số lượng khách</label>
                      <input type="number" min="1" defaultValue="1" required />
                    </div>
                    <button type="submit" className="book-btn w-full">Thanh toán & Xác nhận</button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="contact" id="contact">
        <motion.div 
          className="contact-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
        >
          <h2>Bắt Đầu Chuyến Đi Trong Mơ</h2>
          <p>Đăng ký email để nhận lộ trình du lịch chi tiết và voucher giảm 20% cho tour đầu tiên.</p>
          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Nhập email của bạn..." required />
            <button type="submit">Đăng Ký</button>
          </form>
        </motion.div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-col">
            <h3>Viet<span>Travel</span></h3>
            <p>Trang web thông tin du lịch hàng đầu, mang đến những hướng dẫn chi tiết và kinh nghiệm thực tế nhất.</p>
          </div>
          <div className="footer-col">
            <h3>Danh mục</h3>
            <ul>
              <li><a href="#regions" onClick={(e) => handleScrollTo(e, 'regions')}>Du lịch Miền Bắc</a></li>
              <li><a href="#regions" onClick={(e) => handleScrollTo(e, 'regions')}>Du lịch Miền Trung</a></li>
              <li><a href="#regions" onClick={(e) => handleScrollTo(e, 'regions')}>Du lịch Miền Nam</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Liên Hệ</h3>
            <ul>
              <li>Email: contact@viettravel.com</li>
              <li>Hotline: 1900 6789</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
