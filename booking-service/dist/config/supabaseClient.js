"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
require('dotenv').config();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
console.log(supabaseUrl, supabaseAnonKey);
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
