import { useState } from 'react';
import { Edit2, Phone, MapPin, Mail, Calendar, User2 } from 'lucide-react';
import EditDialog from './EditDialog';
import { motion } from 'framer-motion';
import  formattedDate  from '../../utils/formattedDate';

const ProfileForm = ({ data, onEdit }) => {
  const [editField, setEditField] = useState(null);

  const handleEdit = (field, fieldType = 'text') => {
    setEditField({ field, type: fieldType });
  };

  const handleSave = (value) => {
    onEdit(editField.field, value);
    setEditField(null);
  };

  const renderEditableField = (label, value, icon, field, fieldType = 'text') => {
    return (
      <div className="group">
        <label className="text-base font-bold text-[#16a34a] mb-2 transition-colors duration-300">
          {label}
        </label>
        <div className="relative">
          {icon}
          <input
            type="text"
            readOnly
            value={value}
            className="w-full pl-10 pr-12 py-3 bg-white border-2 border-gray-100 rounded-lg cursor-pointer group-hover:border-green-200 transition-colors duration-300"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <motion.button
              onClick={() => handleEdit(field, fieldType)}
              className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {renderEditableField('住所', data.address, 
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 transition-colors duration-300" />, 
        'address'
      )}
      
      <div>
        <label className="text-base font-bold text-[#16a34a] mb-2 transition-colors duration-300">
          メールアドレス
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300" />
          <input
            type="email"
            value={data.email}
            disabled
            className="w-full pl-10 py-3 bg-gray-50 border-2 border-gray-100 rounded-lg text-gray-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {renderEditableField('生年月日', formattedDate(data.birthday), 
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 transition-colors duration-300" />, 
          'birthday', 
          'date'
        )}
        {renderEditableField('電話番号', data.phone, 
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 transition-colors duration-300" />, 
          'phone', 
          'tel'
        )}
      </div>

      <div>
        <label className="text-base font-bold text-[#16a34a] mb-2 transition-colors duration-300">
          性別
        </label>
        <div className="relative">
          <div className="flex items-center gap-8 py-3 pl-10">
            <User2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 transition-colors duration-300" />
            {[
              { value: 'male', label: '男性' },
              { value: 'female', label: '女性' },
              { value: 'other', label: 'その他' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-default">
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={data.gender === option.value}
                  readOnly
                  className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 transition duration-300"
                />
                <span className="text-sm text-gray-700">
                  {option.label}
                </span>
              </label>
            ))}
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <motion.button
                onClick={() => handleEdit('gender', 'gender')}
                className="p-2 text-gray-400 hover:text-green-600 rounded-full hover:bg-green-50 transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Edit2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <EditDialog
        isOpen={editField !== null}
        onClose={() => setEditField(null)}
        onSave={handleSave}
        title={editField?.field}
        currentValue={editField ? data[editField.field] : ''}
        fieldType={editField?.type}
      />
    </motion.div>
  );
};

export default ProfileForm;