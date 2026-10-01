import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  LineChart, LayoutPanelLeft, BadgeCheck, UsersRound, 
  MousePointerClick, MapPinned, Building2, Crosshair,
  PieChart as PieChartIcon, TextSearch, Zap,
  MessagesSquare, Award, Earth, MonitorSmartphone, Contact, Wallet
} from 'lucide-react';

// --- TẤT CẢ DỮ LIỆU ĐÃ ĐƯỢC VIỆT HÓA 100% ---

const trafficData = [
  { date: '25/09', organic: 13000, direct: 5200 },
  { date: '26/09', organic: 14200, direct: 5398 },
  { date: '27/09', organic: 12800, direct: 4980 },
  { date: '28/09', organic: 15780, direct: 6908 },
  { date: '29/09', organic: 18890, direct: 7800 },
  { date: '30/09', organic: 22390, direct: 9800 },
  { date: '01/10', organic: 29550, direct: 11300 },
];

const sourceData = [
  { name: 'Tự nhiên (SEO)', value: 55, fill: '#0ea5e9' },
  { name: 'Trực tiếp', value: 25, fill: '#14b8a6' },
  { name: 'Mạng xã hội', value: 12, fill: '#8b5cf6' },
  { name: 'Liên kết ngoài', value: 8, fill: '#f59e0b' },
];

const topKeywords = [
  { keyword: 'vietravel', volume: 250000, clicks: 45000, cr: '22.8%', pos: 1 },
  { keyword: 'du lịch đà lạt', volume: 145000, clicks: 12400, cr: '12.4%', pos: 2 },
  { keyword: 'đặt phòng phú quốc', volume: 98000, clicks: 8400, cr: '8.1%', pos: 3 },
  { keyword: 'kinh nghiệm du lịch sapa', volume: 85000, clicks: 6500, cr: '4.2%', pos: 1 },
  { keyword: 'du lịch hội an', volume: 72000, clicks: 5200, cr: '6.5%', pos: 4 },
  { keyword: 'tour vịnh hạ long', volume: 68000, clicks: 4800, cr: '5.2%', pos: 2 },
];

const trendingKeywords = [
  { keyword: 'combo vé máy bay khách sạn phú quốc', growth: '+345%', clicks: 3420, cr: '18.4%', status: 'Nổi Bật' },
  { keyword: 'tour fansipan sapa', growth: '+210%', clicks: 2850, cr: '25.1%', status: 'Nổi Bật' },
  { keyword: 'du thuyền 5 sao hạ long', growth: '+150%', clicks: 1520, cr: '11.5%', status: 'Xu Hướng' },
  { keyword: 'glamping đà lạt', growth: '+120%', clicks: 1800, cr: '9.8%', status: 'Xu Hướng' },
  { keyword: 'resort hội an giá rẻ', growth: '+85%', clicks: 1200, cr: '14.2%', status: 'Mới' },
];

const reviewsData = [
  { name: 'Tour Khám Phá Sapa 3N2Đ - Chinh phục Fansipan', category: 'Tour Cao Cấp', rating: 5, user: 'Hoàng Anh Tú', comment: 'Dịch vụ của Vietravel luôn làm mình an tâm. Hướng dẫn viên chu đáo, Sapa mùa này quá đẹp, cáp treo Fansipan rất an toàn.', date: '01/10' },
  { name: 'Vinpearl Resort & Safari Phú Quốc', category: 'Khách Sạn & Khu Nghỉ Dưỡng', rating: 5, user: 'Trần Cẩm Ly', comment: 'Không gian sang trọng, phòng ốc sạch sẽ. Các bé nhà mình rất thích khu Safari. Đặt qua web giá tốt hơn nhiều.', date: '30/09' },
  { name: 'Tour Săn Mây Đà Lạt 3N2Đ - Checkin Cầu Đất', category: 'Tour Nội Địa', rating: 4, user: 'Nguyễn Thị Hoa', comment: 'Tour đi rất vui nhưng hôm mình đi sương mù dày quá không thấy được mặt trời mọc. Hướng dẫn viên nhiệt tình bù lại.', date: '29/09' },
  { name: 'Du Thuyền 5 Sao Vịnh Hạ Long', category: 'Trải Nghiệm Đẳng Cấp', rating: 5, user: 'Lê Minh Hùng', comment: 'Đẳng cấp 5 sao thực sự. Hải sản tươi ngon, nhân viên phục vụ phòng 24/24. Cực kỳ đáng tiền.', date: '28/09' },
  { name: 'Tour Khám Phá Phố Cổ Hội An - Đà Nẵng 4N3Đ', category: 'Tour Gia Đình', rating: 5, user: 'Phạm Thanh Bình', comment: 'Lịch trình rất hợp lý cho người lớn tuổi. Khách sạn ở Hội An rất đẹp và mang đậm phong cách cổ điển.', date: '27/09' },
  { name: 'Khách Sạn Mường Thanh Sapa', category: 'Khách Sạn', rating: 3, user: 'Vũ Quốc Việt', comment: 'Cảnh quan đẹp nhưng đồ ăn sáng buffet hơi ít món. Bù lại ngay trung tâm nên đi lại rất tiện.', date: '25/09' },
  { name: 'Combo Vé Máy Bay & Khách Sạn Phú Quốc', category: 'Combo Tiết Kiệm', rating: 5, user: 'Đinh Tùng', comment: 'Gói combo siêu tiện lợi. Mình không cần phải suy nghĩ nhiều, Vietravel lo từ A đến Z. Cảm ơn công ty.', date: '22/09' },
  { name: 'Tour Nghỉ Dưỡng Hội An - VinWonders Nam Hội An', category: 'Tour Gia Đình', rating: 4, user: 'Tuấn Anh', comment: 'Khu nghỉ dưỡng sang trọng, VinWonders rộng quá đi mỏi cả chân. Bữa ăn trong tour thỉnh thoảng hơi lặp lại món ăn.', date: '20/09' },
];

const ratingChartData = [
  { name: '5 Sao (Xuất sắc)', value: 72, fill: '#14b8a6' },
  { name: '4 Sao (Tốt)', value: 18, fill: '#0ea5e9' },
  { name: '3 Sao (Tạm ổn)', value: 8, fill: '#f59e0b' },
  { name: '1-2 Sao (Kém)', value: 2, fill: '#ef4444' },
];

const audienceData = [{ name: 'Trong nước', value: 78, fill: '#0ea5e9' }, { name: 'Quốc tế', value: 22, fill: '#f59e0b' }];
const deviceData = [{ name: 'Điện thoại di động', value: 72, fill: '#8b5cf6' }, { name: 'Máy tính bàn', value: 25, fill: '#0ea5e9' }, { name: 'Máy tính bảng', value: 3, fill: '#cbd5e1' }];
const ageData = [{ age: '18-24 Tuổi', users: 15 }, { age: '25-34 Tuổi', users: 45 }, { age: '35-44 Tuổi', users: 25 }, { age: 'Trên 45 Tuổi', users: 15 }];
const conversionData = [{ name: 'Tour Nước Ngoài', rate: 8.5, type: 'Tour' }, { name: 'Tour Nội Địa', rate: 14.2, type: 'Tour' }, { name: 'Khách Sạn', rate: 18.4, type: 'Phòng' }, { name: 'Gói Combo', rate: 12.1, type: 'Combo' }];

export default function SeoDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); 
  const globalFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

  // Hàm helper in ra số Sao
  const renderStars = (rating: number) => {
    return Array.from({length: 5}).map((_, i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? "#f59e0b" : "#e2e8f0"} stroke="none" style={{marginRight: '2px'}}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  const premiumBg = 'linear-gradient(to bottom, #f8fafc, #f1f5f9)';
  const cardStyle = { 
    background: 'white', padding: '30px', borderRadius: '24px', 
    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.06)', border: '1px solid rgba(226, 232, 240, 0.8)',
    display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', height: '100%'
  };

  return (
    <div style={{ fontFamily: globalFont, background: premiumBg, minHeight: '100vh', paddingBottom: '60px', color: '#0f172a' }}>
      
      {/* HEADER LUXURY */}
      <div style={{
        backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(30, 58, 138, 0.85)), url("https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover', backgroundPosition: 'center', padding: '50px 40px 80px', color: 'white',
        borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1250px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '12px' }}>
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', padding: '14px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)' }}>
                <LineChart color="#fbbf24" size={32} />
              </div>
              <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '700', letterSpacing: '-0.5px', fontFamily: globalFont, color: '#ffffff' }}>DỮ LIỆU VIETRAVEL</h1>
            </div>
            <p style={{ margin: '0 0 0 75px', color: '#cbd5e1', fontSize: '16px', fontWeight: '400', fontFamily: globalFont, letterSpacing: '0.5px' }}>Hệ thống Quản trị & Phân tích Dữ liệu Toàn diện</p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ maxWidth: '1250px', margin: '-35px auto 40px', padding: '0 20px', position: 'relative', zIndex: 20 }}>
        <div style={{ display: 'flex', gap: '15px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', padding: '10px', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)', width: 'fit-content', border: '1px solid rgba(255,255,255,0.5)' }}>
          <button onClick={() => setActiveTab('overview')} style={{ fontFamily: globalFont, padding: '14px 28px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s', backgroundColor: activeTab === 'overview' ? '#f1f5f9' : 'transparent', color: activeTab === 'overview' ? '#0f172a' : '#64748b' }}><LayoutPanelLeft size={18}/> Tổng Quan Dữ Liệu</button>
          <button onClick={() => setActiveTab('ratings')} style={{ fontFamily: globalFont, padding: '14px 28px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s', backgroundColor: activeTab === 'ratings' ? '#f1f5f9' : 'transparent', color: activeTab === 'ratings' ? '#0f172a' : '#64748b' }}><BadgeCheck size={18}/> Đánh Giá Dịch Vụ</button>
          <button onClick={() => setActiveTab('audience')} style={{ fontFamily: globalFont, padding: '14px 28px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s', backgroundColor: activeTab === 'audience' ? '#f1f5f9' : 'transparent', color: activeTab === 'audience' ? '#0f172a' : '#64748b' }}><UsersRound size={18}/> Khách Hàng Mục Tiêu</button>
        </div>
      </div>

      <div style={{ maxWidth: '1250px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* =========================================
            TAB 1: TỔNG QUAN
        ========================================= */}
        {activeTab === 'overview' && (
          <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px', alignItems: 'stretch' }}>
              
              <div style={cardStyle}>
                <div>
                  <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Truy Cập Hàng Tháng</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: '700', fontFamily: globalFont, letterSpacing: '-0.5px' }}>29,550</h2>
                    <div style={{ backgroundColor: '#f1f5f9', padding: '10px', borderRadius: '12px' }}><MousePointerClick color="#334155" size={18} /></div>
                  </div>
                </div>
                <p style={{ margin: '20px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>Time TB: <strong style={{color: '#0f172a'}}>03:24</strong> | Thoát: <strong style={{color: '#0f172a'}}>41.2%</strong></p>
              </div>
              
              <div style={cardStyle}>
                <div>
                  <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng Đặt Tour</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: '700', fontFamily: globalFont, letterSpacing: '-0.5px' }}>3,340</h2>
                    <div style={{ backgroundColor: '#fffbeb', padding: '10px', borderRadius: '12px' }}><MapPinned color="#d97706" size={18} /></div>
                  </div>
                </div>
                <p style={{ margin: '20px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>Tỉ lệ chốt: <strong style={{color: '#14b8a6'}}>11.3%</strong></p>
              </div>

              <div style={cardStyle}>
                <div>
                  <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tổng Đặt Phòng</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: '700', fontFamily: globalFont, letterSpacing: '-0.5px' }}>5,437</h2>
                    <div style={{ backgroundColor: '#f0fdfa', padding: '10px', borderRadius: '12px' }}><Building2 color="#0d9488" size={18} /></div>
                  </div>
                </div>
                <p style={{ margin: '20px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>Tỉ lệ chốt: <strong style={{color: '#14b8a6'}}>18.4%</strong></p>
              </div>

              <div style={cardStyle}>
                <div>
                  <p style={{ margin: '0 0 12px 0', color: '#64748b', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tỉ Lệ Nhấp (CTR)</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '28px', color: '#0f172a', fontWeight: '700', fontFamily: globalFont, letterSpacing: '-0.5px' }}>16.6%</h2>
                    <div style={{ backgroundColor: '#f8fafc', padding: '10px', borderRadius: '12px' }}><Crosshair color="#475569" size={18} /></div>
                  </div>
                </div>
                <p style={{ margin: '20px 0 0 0', fontSize: '13.5px', color: '#64748b' }}>Tăng so với tháng trước: <strong style={{color: '#14b8a6'}}>+2.4%</strong></p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '25px', marginBottom: '30px' }}>
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}><LineChart color="#334155" size={20} /> Biểu Đồ Tăng Trưởng Lượng Truy Cập</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={trafficData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorOrg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/><stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/></linearGradient>
                      <linearGradient id="colorDir" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/><stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontFamily: globalFont}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontFamily: globalFont}} />
                    <Tooltip contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', fontFamily: globalFont}} itemStyle={{fontWeight: '700'}} />
                    <Legend verticalAlign="top" height={40} iconType="circle"/>
                    <Area type="monotone" dataKey="organic" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorOrg)" name="Tìm kiếm tự nhiên (SEO)" activeDot={{r: 6}} />
                    <Area type="monotone" dataKey="direct" stroke="#14b8a6" strokeWidth={3} fillOpacity={1} fill="url(#colorDir)" name="Truy cập trực tiếp" activeDot={{r: 6}} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}><PieChartIcon color="#334155" size={20} /> Nguồn Khách Hàng</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart><Pie data={sourceData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={4} dataKey="value">{sourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}</Pie><Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)'}} formatter={(value) => `${value}%`} /><Legend verticalAlign="bottom" height={30} iconType="circle"/></PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}><TextSearch color="#0ea5e9" size={20} /> Top Từ Khoá Nền Tảng</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '15px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                        <th style={{ paddingBottom: '16px', color: '#64748b', fontWeight: '600' }}>Từ Khóa</th>
                        <th style={{ paddingBottom: '16px', textAlign: 'right', color: '#64748b', fontWeight: '600' }}>Lượt Tìm Kiếm</th>
                        <th style={{ paddingBottom: '16px', textAlign: 'right', color: '#64748b', fontWeight: '600' }}>Lượt Nhấp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topKeywords.map((kw, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                          <td style={{ padding: '16px 0', fontWeight: '600', color: '#334155' }}>{kw.keyword}</td>
                          <td style={{ padding: '16px 0', textAlign: 'right', color: '#64748b', fontWeight: '500' }}>{kw.volume.toLocaleString()}</td>
                          <td style={{ padding: '16px 0', textAlign: 'right', color: '#0f172a', fontWeight: '700' }}>{kw.clicks.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}><Zap color="#ef4444" size={20} /> Từ Khóa Đang Lên Xu Hướng</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '15px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                        <th style={{ paddingBottom: '16px', color: '#64748b', fontWeight: '600' }}>Từ Khóa Đột Biến</th>
                        <th style={{ paddingBottom: '16px', textAlign: 'center', color: '#64748b', fontWeight: '600' }}>Mức Tăng</th>
                        <th style={{ paddingBottom: '16px', textAlign: 'right', color: '#64748b', fontWeight: '600' }}>Tỉ Lệ Chốt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trendingKeywords.map((kw, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                          <td style={{ padding: '16px 0', fontWeight: '600', color: '#334155' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {kw.keyword}
                              {kw.status === 'Nổi Bật' && <span style={{width: 6, height: 6, borderRadius: '50%', background: '#ef4444'}}></span>}
                            </div>
                          </td>
                          <td style={{ padding: '16px 0', textAlign: 'center', color: '#dc2626', fontWeight: '700' }}>{kw.growth}</td>
                          <td style={{ padding: '16px 0', textAlign: 'right', color: '#14b8a6', fontWeight: '700' }}>{kw.cr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 2: ĐÁNH GIÁ SẢN PHẨM (LUXURY)
        ========================================= */}
        {activeTab === 'ratings' && (
          <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '30px', marginBottom: '30px' }}>
              
              <div style={cardStyle}>
                <h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MessagesSquare color="#334155" size={22} /> Phản Hồi Thực Tế Của Khách Hàng
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '600px', overflowY: 'auto', paddingRight: '15px' }}>
                  {reviewsData.map((review, i) => (
                    <div key={i} style={{ padding: '24px', borderRadius: '20px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', transition: 'all 0.3s' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                          <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '16px', letterSpacing: '-0.3px' }}>{review.name}</div>
                          <div style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}><span style={{fontWeight: 600, color: '#334155'}}>{review.category}</span> • Đánh giá bởi {review.user}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                          <div style={{ display: 'flex' }}>{renderStars(review.rating)}</div>
                          <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>{review.date}</span>
                        </div>
                      </div>
                      <div style={{ color: '#334155', fontSize: '15px', lineHeight: '1.7', fontStyle: 'italic', background: 'white', padding: '16px 20px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', borderLeft: review.rating >= 4 ? '4px solid #14b8a6' : review.rating === 3 ? '4px solid #f59e0b' : '4px solid #ef4444' }}>
                        "{review.comment}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={cardStyle}>
                  <h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Award color="#f59e0b" size={20} /> Điểm Hài Lòng Trung Bình
                  </h3>
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <h1 style={{ margin: 0, fontSize: '72px', color: '#0f172a', fontWeight: '800', letterSpacing: '-2px' }}>4.8</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', margin: '15px 0' }}>
                      {renderStars(5)}
                    </div>
                    <p style={{ color: '#64748b', margin: 0, fontWeight: '500', fontSize: '15px' }}>Dựa trên <strong style={{color: '#0f172a'}}>18,450</strong> lượt đánh giá hợp lệ</p>
                  </div>
                </div>

                <div style={{ ...cardStyle, flex: 1 }}>
                  <h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <PieChartIcon color="#0ea5e9" size={20} /> Phân Bổ Mức Độ Đánh Giá
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={ratingChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                        {ratingChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)'}} formatter={(value) => `${value}%`} />
                      <Legend verticalAlign="bottom" height={30} iconType="circle"/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================
            TAB 3: KHÁCH HÀNG & THIẾT BỊ
        ========================================= */}
        {activeTab === 'audience' && (
          <div style={{ animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginBottom: '30px' }}>
              <div style={cardStyle}><h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><Earth color="#334155" size={18} /> Vị Trí Địa Lý</h3><ResponsiveContainer width="100%" height={240}><PieChart><Pie data={audienceData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">{audienceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}</Pie><Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)'}} formatter={(value) => `${value}%`} /><Legend verticalAlign="bottom" height={20} iconType="circle"/></PieChart></ResponsiveContainer></div>
              <div style={cardStyle}><h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><MonitorSmartphone color="#334155" size={18} /> Phân Tích Thiết Bị Truy Cập</h3><ResponsiveContainer width="100%" height={240}><PieChart><Pie data={deviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">{deviceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}</Pie><Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)'}} formatter={(value) => `${value}%`} /><Legend verticalAlign="bottom" height={20} iconType="circle"/></PieChart></ResponsiveContainer></div>
              <div style={cardStyle}><h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}><Contact color="#334155" size={18} /> Phân Tích Độ Tuổi Khách Hàng</h3><ResponsiveContainer width="100%" height={240}><BarChart data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/><XAxis dataKey="age" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} /><YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 13}} unit="%" /><Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)'}} formatter={(value) => `${value}%`} /><Bar dataKey="users" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={40} /></BarChart></ResponsiveContainer></div>
            </div>
            <div style={cardStyle}><h3 style={{ margin: '0 0 30px 0', color: '#0f172a', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}><Wallet color="#334155" size={20} /> Tỉ Lệ Chốt Sale Thành Công Theo Danh Mục</h3><ResponsiveContainer width="100%" height={280}><BarChart data={conversionData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9"/><XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} unit="%" /><YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 15, fontWeight: 600}} width={160} /><Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.1)'}} formatter={(value) => `${value}%`} /><Bar dataKey="rate" radius={[0, 8, 8, 0]} barSize={40}>{conversionData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.type === 'Tour' ? '#14b8a6' : entry.type === 'Phòng' ? '#0ea5e9' : '#8b5cf6'} />))}</Bar></BarChart></ResponsiveContainer></div>
          </div>
        )}

      </div>
      
      <style>{`
        * { 
          box-sizing: border-box;
          font-variant-numeric: tabular-nums;
        }
        
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        div::-webkit-scrollbar { width: 6px; }
        div::-webkit-scrollbar-track { background: transparent; }
        div::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        div::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}
