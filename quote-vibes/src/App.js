// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuoteList from './components/QuoteList';
import Home from './components/Home';
import BlogDetail from './components/BlogDetail';
import Container from '@mui/material/Container';
import './App.css';

function App() {
    return (
        <Router>
            <div className="home-button-container">
                <Link to="/">
                    {/* ホームボタンをここに配置する場合はアイコンやテキストを追加 */}
                </Link>
            </div>
            <Container>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/quotes" element={<QuoteList />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
