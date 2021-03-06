'use strict';

import './storage.js';
import generateHeader from './generateHeader.js';
import generateFooter from './generateFooter.js';
import generateCatalog from './generateCatalog.js';
import generateGoodsPage from './generateGoodsPage.js'
import generateCardPage from './generateCardPage.js';
import generateCartPage from './generateCartPage.js';
import { loadData } from './loadData.js';

generateHeader();
generateFooter();
generateCatalog();
generateGoodsPage();
generateCardPage();
generateCartPage();
loadData();


