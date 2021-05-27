function resetData() {
  Swal.fire({
    title: 'ลบข้อมูลทั้งหมดใช่หรือไม่?',
    text: "คุณต้องการลบข้อมูลทั้งหมดใช่หรือไม่",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'ใช่',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'ลบข้อมูลสำเร็จ!',
        'คุณลบข้อมูลผู้ป่วยสำเร็จ',
        'success'
      )
      setInterval(() => {
        window.location.href = '/trolley/resetcsv'
      }, 2000);
    }else{
      window.location.href = '/trolley/detail-trolley/1'
    }
    
  })
 
  //return confirm('คุณต้องการออกจากระบบหรือไม่',window.location.href='/trolley/resetcsv')
}

function senddata() {
  const myform = document.getElementById('myform')
  myform.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData();
    fetch('/upload', {
      method: 'post',
      body: formData,
    })
  })
}

function load() {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'บันทึกข้อมูลสำเร็จ',
    text: 'ข้อมูลได้บันทึกลงฐานข้อมูลแล้ว',
    showConfirmButton: false,
    timer: 1000
  })
  setInterval(() => {
    window.location.href = '/trolley/detail-trolley/1'
  }, 2000);
}

function logout() {
  Swal.fire({
    title: 'ออกจากระบบ?',
    text: "ออกจากระบบ",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'ใช่',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      
        window.location.href = '/users/logout'
      
    }
    
  })
}
 function resetPatient() {
  Swal.fire({
    title: 'ลบข้อมูลผู้ป่วยใช่หรือไม่?',
    text: "คุณต้องการลบข้อมูลผู้ป่วยใช่หรือไม่",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'ใช่',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'ลบข้อมูลสำเร็จ!',
        'คุณลบข้อมูลผู้ป่วยสำเร็จ',
        'success'
      )
      setInterval(() => {
        window.location.href = '/trolley/resetpatient'
      }, 2000);
    }else{
      window.location.href = '/trolley/uploadtrollet'
    }
    
  })
 }
    
 function resetDrug() {
  Swal.fire({
    title: 'ลบข้อมูลรายยาใช่หรือไม่?',
    text: "คุณต้องการลบข้อมูลรายยาใช่หรือไม่",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#28a745',
    cancelButtonColor: '#dc3545',
    confirmButtonText: 'ใช่',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'ลบข้อมูลสำเร็จ!',
        'คุณลบข้อมูลข้อมูลรายยา',
        'success'
      )
      setInterval(() => {
        window.location.href = '/trolley/resetdrug'
      }, 2000);
    }else{
      window.location.href = '/trolley/uploadlistdrug'
    }
    
  })
 }
 

