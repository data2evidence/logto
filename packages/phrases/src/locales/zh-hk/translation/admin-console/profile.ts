const profile = {
  page_title: '賬戶管理',
  title: '賬戶管理',
  description: '在這裡，你可以修改賬戶設置和管理個人信息，以確保賬戶安全。',
  settings: {
    title: '賬戶設置',
    profile_information: '個人信息',
    avatar: '頭像',
    name: '姓名',
    username: '用戶名',
  },
  link_account: {
    title: '關聯賬戶',
    email_sign_in: '郵件登錄',
    email: '郵件',
    social_sign_in: '社交賬號登錄',
    link_email: '綁定郵箱',
    link_email_subtitle: '綁定郵箱以便登錄或幫助恢復賬戶。',
    email_required: '郵箱不能為空',
    invalid_email: '無效的郵箱地址',
    identical_email_address: '輸入的郵箱地址與當前郵箱地址相同',
    anonymous: '匿名',
  },
  password: {
    title: '密碼與安全',
    password: '密碼',
    password_setting: '密碼設置',
    new_password: '新密碼',
    confirm_password: '確認密碼',
    enter_password: '輸入當前密碼',
    enter_password_subtitle: '為確保帳戶安全，在修改密碼前，請先輸入當前密碼以通過身份驗證。',
    set_password: '設置密碼',
    verify_via_password: '通過密碼驗證',
    show_password: '顯示密碼',
    required: '密碼不能為空',
    do_not_match: '密碼不匹配，請重新輸入。',
  },
  code: {
    enter_verification_code: '輸入驗證碼',
    enter_verification_code_subtitle: '驗證碼已發送至 <strong>{{target}}</strong>',
    verify_via_code: '通過郵箱驗證碼驗證',
    resend: '重新發送驗證碼',
    resend_countdown: '在 {{countdown}} 秒後重新發送',
  },
  delete_account: {
    title: '刪除賬戶',
    label: '刪除賬戶',
    description: '刪除賬戶將會刪除所有個人信息、用戶數據和配置。此操作無法撤銷。',
    button: '刪除賬戶',
    dialog_paragraph_1:
      '很抱歉聽到你想要刪除你的帳戶。刪除你的帳戶將永久刪除所有數據，包括用戶信息、日誌和設置，此操作無法撤銷。因此，請確保在繼續之前備份任何重要數據。',
    dialog_paragraph_2:
      '要繼續刪除帳戶的刪除過程，請通過 <a>mail</a> 向我們的支持團隊發送主題為“帳戶刪除請求”的郵件。我們將協助你並確保所有數據都已從我們的系統中正確刪除。',
    dialog_paragraph_3:
      '感謝你選擇 Logto Cloud。如果你有任何進一步的問題或疑慮，請隨時與我們聯繫。',
  },
  set: '設置',
  change: '修改',
  link: '關聯',
  unlink: '取消關聯',
  not_set: '未設置',
  change_avatar: '修改頭像',
  change_name: '修改姓名',
  change_username: '修改用戶名',
  set_name: '設置姓名',
  email_changed: '已成功綁定郵箱。',
  password_changed: '已重置密碼。',
  updated: '{{target}}更改成功。',
  linked: '{{target}}賬號綁定成功。',
  unlinked: '{{target}}賬號解綁成功。',
  email_exists_reminder: '該郵箱 {{email}} 已被其他賬號綁定，請更換郵箱。',
  unlink_confirm_text: '確定解綁',
  unlink_reminder: '解綁後，用戶將無法使用該 <span></span> 賬號進行登錄。確定要解綁嗎？',
};

export default Object.freeze(profile);
