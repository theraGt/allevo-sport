import app from './app.js';
import http from 'http';

const PORT = app.get('port');

http.createServer(app).listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Allevo Sports API corriendo en http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
});
