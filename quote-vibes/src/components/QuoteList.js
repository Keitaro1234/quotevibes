import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom'; // useNavigateのインポート
import { db } from "../firebase-config";
import Fab from '@mui/material/Fab'; // FABのインポート
import QuoteIcon from '@mui/icons-material/FormatQuote'; // アイコンのインポート
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion'; // motionのインポート
import HomeIcon from '@mui/icons-material/Home'; // Homeアイコンのインポート

// カスタムフォントを適用したテーマの作成
const theme = createTheme({
    typography: {
        fontFamily: 'Montserrat, Arial, sans-serif',
        h1: {
            fontFamily: 'Playfair Display, serif',
        },
        h2: {
            fontFamily: 'Josefin Sans, sans-serif',
        },
        button: {
            fontFamily: 'Playwrite IN, sans-serif',
        },
    },
});

function QuoteList() {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [randomQuote, setRandomQuote] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Motivation");
    const [selectedGenre, setSelectedGenre] = useState("Rock");
    const navigate = useNavigate(); // useNavigateフックの使用

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const quotesCollection = collection(db, "quotes");
                const q = query(
                    quotesCollection,
                    where("category", "==", selectedCategory),
                    where("genre", "==", selectedGenre)
                );
                const quoteSnapshot = await getDocs(q);
                const quoteList = quoteSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setQuotes(quoteList);
                if (quoteList.length > 0) {
                    setRandomQuote(quoteList[Math.floor(Math.random() * quoteList.length)]);
                } else {
                    setRandomQuote(null);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quotes:", error);
                setLoading(false);
            }
        };

        fetchQuotes();
    }, [selectedCategory, selectedGenre]);

    const handleNewQuote = () => {
        if (quotes.length > 0) {
            setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (quotes.length === 0) {
        return <div>No quotes in this category.</div>;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box 
                sx={{ 
                    textAlign: 'center', 
                    mt: 4,
                    fontFamily: 'Montserrat, Arial, sans-serif' // デフォルトフォントを設定
                }}
            >
                <Typography 
                    variant="h1"
                    sx={{
                        color: '#4A90E2',
                        mb: 2,
                    }}
                >
                    Inspirational Quote
                </Typography>
                {randomQuote && (
                    <>
                        <Typography 
                            variant="h2"
                            sx={{
                                color: '#333',
                                mb: 1,
                            }}
                        >
                            {randomQuote.text}
                        </Typography>
                        <Typography 
                            sx={{
                                color: '#333',
                                mb: 3,
                            }}
                        >
                            - {randomQuote.author}
                        </Typography>
                    </>
                )}
                <Fab
                    variant="extended"
                    onClick={handleNewQuote}
                    sx={{
                        mt: 2,
                        backgroundColor: '#ffffff', // 白背景
                        color: '#000000', // 黒文字
                        '&:hover': {
                            backgroundColor: '#e0e0e0', // ホバー時のカラー
                        },
                        fontFamily: 'Playwrite IN, sans-serif' // ボタンに特定のフォントを適用
                    }}
                >
                    <QuoteIcon sx={{ mr: 1 }} />
                    New Quote
                </Fab>
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'fixed', bottom: '1%', right: '2%' }} // 相対的な位置を設定
                >
                    <Fab
                        color="primary"
                        onClick={() => navigate('/')}
                        sx={{
                            backgroundColor: '#ffffff', // 白背景
                            color: '#000000', // 黒文字
                            '&:hover': {
                                backgroundColor: '#e0e0e0', // ホバー時のカラー
                            }
                        }}
                    >
                        <HomeIcon />
                    </Fab>
                </motion.div>
            </Box>
        </ThemeProvider>
    );
}

export default QuoteList;
