import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ArticleIcon from '@mui/icons-material/Article';
import { DndProvider, useDrag } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { motion } from 'framer-motion';
import Fab from '@mui/material/Fab';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
// src/components/Home.js
import { blogPosts } from '../data/blogData';



console.log(blogPosts);


const mainCategories = ["Category", "Genre", "Random"];
const subCategories = {
    "Category": ["Motivation", "Life", "Love", "Wisdom"],
    "Genre": ["Rock", "Pop", "Jazz", "Country"]
};

// Define custom icons for each category and genre
const categoryIcons = {
    "Category": <CategoryIcon />,
    "Motivation": <FlashOnOutlinedIcon />,
    "Life": <BedOutlinedIcon />,
    "Love": <VolunteerActivismOutlinedIcon />,
    "Wisdom": <PsychologyAltOutlinedIcon />,
    "Genre": <MusicNoteIcon />,
    "Rock": <MusicNoteIcon />,
    "Pop": <MusicNoteIcon />,
    "Jazz": <MusicNoteIcon />,
    "Country": <MusicNoteIcon />
};

const ItemTypes = {
    CARD: 'card'
};
function AnimatedHeader({ text }) {
    return (
        <motion.div
            style={{
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: '"Dancing Script", cursive',
                fontSize: '2.5rem',
                fontWeight: 600,
                color: '#333',
                zIndex: 1000
            }}
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ 
                opacity: [0, 1, 1, 0],
                clipPath: ['inset(0 100% 0 0)', 'inset(0 0 0 0)', 'inset(0 0 0 0)', 'inset(0 100% 0 0)']
            }}
            transition={{ 
                duration: 4,
                times: [0, 0.3, 0.7, 1],
                ease: "easeInOut"
            }}
        >
            {text}
        </motion.div>
    );
}
// サンプルのブログ記事データ

const DraggableCard = ({ id, text, onClick, children }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
       <Card
  ref={drag}
  sx={{
    margin: '10px',
    width: '220px', // カードサイズを少し大きめに調整
    height: '120px',
    opacity: isDragging ? 0.8 : 1, // ドラッグ中に少し透明化
    transform: isDragging ? 'scale(1.1)' : 'scale(1)', // ドラッグ中に拡大
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.2s ease', // スムーズなアニメーション
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // ガラス風の半透明背景
    borderRadius: '16px', // カードの角を丸める
    backdropFilter: 'blur(10px)', // ガラス効果
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px', // 内側の余白を広げる
    boxSizing: 'border-box',
    boxShadow: isDragging
      ? '0 12px 24px rgba(0, 0, 0, 0.2)' // ドラッグ中の影
      : '0 4px 16px rgba(0, 0, 0, 0.1)', // 通常時の影
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)', 
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)', // ホバー時の影
    },
  }}
  onClick={onClick}
>
  
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '250%',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        component="div"
        sx={{
          fontWeight: 600,
          color: '#333',
          marginBottom: '8px',
        }}
      >
        {text}
      </Typography>
      {children}
    </CardContent>
</Card>

    );
};

function Home() {
    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleBlogPostClick = (postId) => {
        navigate(`/blog/${postId}`);
    };

    const handleMainCategoryClick = (category) => {
        if (category === "Random") {
            navigate('/quotes');
        } else {
            setSelectedMainCategory(category === selectedMainCategory ? null : category);
        }
    };

    const categoryDescriptions = {
        Category: "Explore various topics and themes.",
        Genre: "Discover music genres you love.",
        Random: "Get a random quote or inspiration.",
      }; 
    const renderSubCategories = () => {
        if (!selectedMainCategory || selectedMainCategory === "Random") return null;

        const subCategoriesList = subCategories[selectedMainCategory] || [];

        return (
            <Box mt={2} display="flex" flexDirection="row" flexWrap="wrap">
                {subCategoriesList.map((subCategory, index) => (
                    <motion.div
                        key={subCategory}
                        initial={{ opacity: 0, x: -100, borderRadius: '50%' }}
                        animate={{ opacity: 1, x: 0, borderRadius: '50%' }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.1, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', borderRadius: '50%' }}
                    >
                        <Tooltip title={subCategory}>
                            <IconButton
                                color="secondary"
                                style={{ margin: '10px', color: '#424242' }}
                                component={Link}
                                to={`/quotes?category=${selectedMainCategory}&subCategory=${subCategory}`}
                            >
                                {categoryIcons[subCategory]}
                            </IconButton>
                        </Tooltip>
                    </motion.div>
                ))}
            </Box>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
             <AnimatedHeader text="Welcome to QuoteVibes." />
            <Box sx={{ display: 'flex' }}>
            <IconButton
  onClick={handleDrawerToggle}
  sx={{ 
    position: 'fixed',
    left: '20px',
    top: '20px',
    zIndex: 1200,
    width: 48, // ボタンサイズを統一
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // 半透明で高級感
    borderRadius: '12px', // 角を緩やかに丸める
    backdropFilter: 'blur(10px)', // ガラスのような効果
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)', // 柔らかい影
    transition: 'all 0.3s ease', // スムーズなアニメーション
    border: '1px solid rgba(255, 255, 255, 0.4)', // 微細な境界線
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)', // ホバーでやや明るく
      transform: 'translateY(-2px)', // 浮き上がる効果
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)', // 強調された影
    },
    '&:active': {
      transform: 'translateY(0)', // 押下時に元の位置へ
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // 影を弱める
    }
  }}
>
  <MenuIcon sx={{ fontSize: 24, color: '#1a1a1a' }} /> {/* アイコンを少し大きく */}
</IconButton>

<Drawer
  anchor="left"
  open={drawerOpen}
  onClose={handleDrawerToggle}
  sx={{
    '& .MuiDrawer-paper': { 
      width: 360, // 縦長でコンパクトな幅
      height: '100vh', // 画面全体の高さ
      backgroundColor: 'rgba(255, 255, 255, 0.95)', // 半透明の背景
      borderRadius: '16px', // 全体を均一に角丸
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)', // 柔らかい影
      backdropFilter: 'blur(10px)', // ガラスのような効果
      overflow: 'hidden', // 内容のはみ出しを防ぐ
      border: '1px solid rgba(255, 255, 255, 0.3)', // 微細な境界線
    },
  }}
>
  <List
    sx={{
      padding: 2, // 内側に余白を追加
      '& .MuiListItem-root': {
        marginY: 1, // 各リストアイテム間にスペース
        borderRadius: '12px', // アイテム自体を丸く
        transition: 'all 0.3s ease', // スムーズなアニメーション
      },
    }}
  >
    <ListItem>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: '#333',
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        }}
      >
        Blog Posts
      </Typography>
    </ListItem>
    <Divider sx={{ marginY: 1 }} />
    {blogPosts.map((post) => (
      <ListItem
        button
        key={post.id}
        onClick={() => handleBlogPostClick(post.id)}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // 背景色を柔らかく
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', // 軽い影
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)', // ホバー時の背景色
            transform: 'translateY(-2px)', // 浮き上がる効果
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // ホバー時の影を強調
          },
          
        }}
      >
        <ListItemIcon sx={{ minWidth: 40, color: '#1a1a1a' }}>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText
          primary={post.title}
          secondary={post.date}
          primaryTypographyProps={{
            fontWeight: 500,
            fontSize: '1rem',
            color: '#2c2c2c',
          }}
          secondaryTypographyProps={{
            fontSize: '0.85rem',
            color: '#666',
          }}
        />
      </ListItem>
    ))}
    
  </List>
</Drawer>



<Box
  sx={{
    position: 'relative',
    padding: '40px 20px', // 上下の余白を増やして空間を広げる
    width: '100%',
    background: 'linear-gradient(145deg, #f9f9f9, #ffffff)', // 軽いグラデーションで深みを追加
    borderRadius: '16px', // 親しみやすさを強調
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05)', // 柔らかい影を追加
  }}
>
  {/* セクションタイトル */}
  <motion.h2
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      fontSize: '2rem', // 視認性を高める大きなタイトル
      fontWeight: 600,
      color: '#333', // 洗練された濃いグレー
      textAlign: 'center',
      marginBottom: '20px', // タイトルと次の要素の間に余白
     // Appleらしいフォント
        }}
      >
        QuoteVibes
        
      </motion.h2>

    
  <motion.p
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    style={{
      fontSize: '1rem',
      color: '#555', // 説明文にはやや淡いグレーを使用
      textAlign: 'center',
      marginBottom: '30px', // 説明文とコンテンツ間のスペースを増加
      lineHeight: 1.6, // 読みやすさを向上
      fontFamily: '"SF Pro Text", "Helvetica Neue", Arial, sans-serif',
    }}
  >
  </motion.p>

  {/* カテゴリーカード */}
  <Box
  display="flex"
  justifyContent="center" // 中央揃え
  flexWrap="wrap"
 // カード間に均等な間隔を設定
>
    {mainCategories.map((mainCategory) => (
        <motion.div
            key={mainCategory}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <DraggableCard
                id={mainCategory}
                onClick={() => handleMainCategoryClick(mainCategory)}
            >
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Josefin Sans", "Helvetica Neue", Arial, sans-serif', // Josefin Sansフォントを使用
                                fontWeight: 500,
                                textAlign: 'center',
                                color: '#1a1a1a', // 濃いグレーで視認性を高める
                            }}
                        >
                            {mainCategory}
                        </Typography>
                        {/* カテゴリーの説明 */}
        <Typography
          variant="body2"
          sx={{
            fontFamily: '"SF Pro Text", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 400,
            textAlign: 'center',
            color: '#666', // 説明文はやや淡いグレーで
            marginTop: '8px', // タイトルとの間に余白
          }}
        >
          {categoryDescriptions[mainCategory]}
        </Typography>
      </DraggableCard>
    </motion.div>
  ))}
</Box>

                    {renderSubCategories()}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ position: 'fixed', bottom: '1%', right: '2%' }}
                    >
                        <Fab
                            color="primary"
                            onClick={() => navigate('/')}
                            sx={{
                                backgroundColor: '#ffffff',
                                color: '#000000',
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                }
                            }}
                        >
                            <HomeIcon />
                        </Fab>
                    </motion.div>
                </Box>
            </Box>
        </DndProvider>
    );
}

export default Home;