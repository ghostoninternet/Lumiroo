import { motion } from "framer-motion";
import { 
  Facebook, 
  Twitter, 
  Instagram,
  FileText,
  HeadphonesIcon,
  Sparkles
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-600">
      <div className="max-w-[1400px] mx-auto px-6 py-4">
        <div className="flex flex-wrap items-start justify-between gap-8">
          {/* Brand Section */}
          <div className="bg-green-700/30 backdrop-blur-sm rounded-lg p-3">
            <motion.h3 
              className="text-xl font-bold text-white mb-1"
              whileHover={{ scale: 1.02 }}
            >
              Lumiroo
            </motion.h3>
            <p className="text-green-50 text-sm mb-3">
              楽しい遊び場を探しましょう！
            </p>
            <div className="flex gap-2">
              {[
                { icon: Facebook, href: 'https://facebook.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Instagram, href: 'https://instagram.com' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-green-600 hover:bg-green-50 transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap items-start gap-12">
            {/* Legal Info */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-white">
                <FileText className="w-4 h-4" />
                <h4 className="font-semibold">法的情報</h4>
              </div>
              <nav className="space-y-2">
                <motion.a
                  href="#"
                  className="block text-sm text-green-100 hover:text-white"
                  whileHover={{ x: 3 }}
                >
                  利用規約
                </motion.a>
                <motion.a
                  href="#"
                  className="block text-sm text-green-100 hover:text-white"
                  whileHover={{ x: 3 }}
                >
                  プライバシーポリシー
                </motion.a>
              </nav>
            </div>

            {/* Support */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-white">
                <HeadphonesIcon className="w-4 h-4" />
                <h4 className="font-semibold">サポート</h4>
              </div>
              <nav className="space-y-2">
                <motion.a
                  href="#"
                  className="block text-sm text-green-100 hover:text-white"
                  whileHover={{ x: 3 }}
                >
                  お問い合わせ
                </motion.a>
                <motion.a
                  href="#"
                  className="block text-sm text-green-100 hover:text-white"
                  whileHover={{ x: 3 }}
                >
                  よくある質問
                </motion.a>
              </nav>
            </div>

            {/* Other Section */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-white">
                <Sparkles className="w-4 h-4" />
                <h4 className="font-semibold">その他</h4>
              </div>
              <motion.div
                className="bg-green-700/30 backdrop-blur-sm rounded-lg p-3"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-white mb-2">
                  新機能をお試しください!
                </p>
                <motion.button
                  className="text-xs bg-white text-green-600 px-4 py-1.5 rounded-md hover:bg-green-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  詳細を見る
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 pt-3 border-t border-green-500/30">
          <p className="text-xs text-center text-green-100">
            &copy; {new Date().getFullYear()} Lumiroo. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;