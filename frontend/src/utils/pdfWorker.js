import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import Worker from 'pdfjs-dist/build/pdf.worker?worker';

GlobalWorkerOptions.workerPort = new Worker();