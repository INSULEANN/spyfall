# ต่อไฟล์ภาพใหม่ picartHD27.jsx ขึ้นไป เข้ากับ src/picart.jsx (รันซ้ำได้)
# ใช้: python -I scripts/wirepics.py
import glob, os, re
p = 'src/picart.jsx'
s = open(p, encoding='utf-8').read()
nums = sorted(int(re.search(r'HD(\d+)', f).group(1)) for f in glob.glob('src/picartHD*.jsx') if re.search(r'HD(\d+)\.jsx$', f) and int(re.search(r'HD(\d+)', f).group(1)) >= 27)
block = '// ภาพใหม่ 201+ (มีแต่แบบละเอียด)\n' + ''.join(f"import {{ HD{n} }} from './picartHD{n}.jsx';\n" for n in nums) + 'const NEW = [' + ', '.join(f'...HD{n}' for n in nums) + '].sort((a, b) => a[0] - b[0]);'
s = re.sub(r'// ภาพใหม่ 201\+ \(มีแต่แบบละเอียด\)\n(?:import \{ HD\d+ \} from \'\./picartHD\d+\.jsx\';\n)*const NEW = \[[^\]]*\]\.sort\(\(a, b\) => a\[0\] - b\[0\]\);', block, s)
open(p, 'w', encoding='utf-8', newline='\n').write(s)
print('wired', nums)
