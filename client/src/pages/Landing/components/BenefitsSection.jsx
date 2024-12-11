import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Clock } from 'lucide-react';

const BenefitCard = ({ icon: Icon, title, description, index, gradient }) => {
  return (
    <motion.div 
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="p-8 rounded-2xl group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"  
        style={{ background: 'white' }}
        whileHover={{
          boxShadow: "0 20px 40px rgba(22, 163, 74, 0.15)",
        }}
      >
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: gradient,
          }}
        />

        {/* Content Wrapper */}
        <div className="relative z-10 flex gap-6">
          {/* Icon Container */}
          <motion.div
            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: gradient }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>

          {/* Text Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#16a34a] transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Animated Border */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: gradient }}
        />
      </motion.div>
    </motion.div>
  );
};

const BenefitsSection = () => {
  const gradient = "linear-gradient(135deg, #16a34a, #166534)";
  
  const benefits = [
    {
      icon: Shield,
      title: "安全で信頼できる遊び場情報",
      description: "すべての遊び場は安全基準を満たし、定期的に確認されています。お子様の安全を第一に考えた情報提供を心がけています。",
    },
    {
      icon: Users,
      title: "コミュニティからのリアルな口コミ", 
      description: "実際に訪れた家族からの評価と感想をご覧いただけます。信頼できる情報でより良い選択をサポートします。",
    },
    {
      icon: Clock,
      title: "簡単な予約システム",
      description: "24時間いつでも予約が可能で、スムーズに利用開始できます。面倒な手続きは不要です。",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Lumirooの<span className="text-[#16a34a]">メリット</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            安全で楽しい遊び場探しを、より簡単により良く。
          </p>
        </motion.div>

        {/* Benefits Stack */}
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} index={index} gradient={gradient} />
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#d1fae5]/5 to-transparent -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#dcfce7]/5 to-transparent -z-10" />
    </section>
  );
};

export default BenefitsSection;