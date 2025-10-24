// รอให้หน้าเว็บโหลดเสร็จก่อน
document.addEventListener('DOMContentLoaded', function() {

    // 1. หาปุ่มและเมนู
    const hamburger = document.getElementById('hamburger-icon');
    const menu = document.getElementById('mobile-menu');
    
    // 2. ฟังก์ชันสำหรับเปิด/ปิดเมนู
    function toggleMenu() {
        // เช็คก่อนว่าหา element เจอไหม
        if (menu) {
            menu.classList.toggle('open');
        }
    }
    
    // 3. สั่งให้ "ปุ่ม" เมื่อถูกคลิก ให้เรียกฟังก์ชัน
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // (ลบส่วน event listener ของ overlay ออก)

    // (เพิ่ม) ปิดเมนูเมื่อคลิกนอกเมนู (ถ้าต้องการ)
    document.addEventListener('click', function(event) {
        // เช็คว่าเมนูเปิดอยู่ และไม่ได้คลิกที่ปุ่ม หรือในเมนู
        if (menu && menu.classList.contains('open') && 
            hamburger && !hamburger.contains(event.target) && 
            !menu.contains(event.target)) {
            toggleMenu(); // เรียกฟังก์ชันปิดเมนู
        }
    });

});
