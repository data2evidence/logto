const sign_up_and_sign_in = {
  identifiers_email: 'عنوان البريد الإلكتروني',
  identifiers_phone: 'رقم الهاتف',
  identifiers_username: 'اسم المستخدم',
  identifiers_email_or_sms: 'عنوان البريد الإلكتروني أو رقم الهاتف',
  identifiers_none: 'غير مطبق',
  and: 'و',
  or: 'أو',
  sign_up: {
    title: 'التسجيل',
    sign_up_identifier: 'معرف التسجيل',
    identifier_description:
      'معرف التسجيل مطلوب لإنشاء الحساب ويجب أن يتم تضمينه في شاشة تسجيل الدخول الخاصة بك.',
    sign_up_authentication: 'إعدادات المصادقة للتسجيل',
    authentication_description: 'سيكون على المستخدمين إكمال جميع الإجراءات المحددة في التدفق.',
    set_a_password_option: 'إنشاء كلمة المرور الخاصة بك',
    verify_at_sign_up_option: 'التحقق عند التسجيل',
    social_only_creation_description: '(ينطبق هذا على إنشاء الحساب الاجتماعي فقط)',
  },
  sign_in: {
    title: 'تسجيل الدخول',
    sign_in_identifier_and_auth: 'معرف وإعدادات المصادقة لتسجيل الدخول',
    description:
      'يمكن للمستخدمين تسجيل الدخول باستخدام أي من الخيارات المتاحة. قم بضبط التخطيط عن طريق سحب وإسقاط الخيارات أدناه.',
    add_sign_in_method: 'إضافة طريقة تسجيل الدخول',
    password_auth: 'كلمة المرور',
    verification_code_auth: 'رمز التحقق',
    auth_swap_tip: 'قم بتبديل الخيارات أدناه لتحديد الظهور الأول في التدفق.',
    require_auth_factor: 'يجب عليك تحديد عامل مصادقة واحد على الأقل.',
  },
  social_sign_in: {
    title: 'تسجيل الدخول الاجتماعي',
    social_sign_in: 'تسجيل الدخول الاجتماعي',
    description:
      'اعتمادًا على المعرف الإلزامي الذي قمت بإعداده ، قد يُطلب من المستخدم تقديم معرف عند التسجيل باستخدام موصل اجتماعي.',
    add_social_connector: 'إضافة موصل اجتماعي',
    set_up_hint: {
      not_in_list: 'غير مدرج؟',
      set_up_more: 'إعداد',
      go_to: 'موصلات اجتماعية أخرى الآن.',
    },
    automatic_account_linking: 'ربط الحساب التلقائي',
    automatic_account_linking_label:
      'عند التشغيل ، إذا قام المستخدم بتسجيل الدخول باستخدام هوية اجتماعية جديدة في النظام ، وهناك حساب واحد فقط موجود بنفس المعرف (على سبيل المثال ، البريد الإلكتروني) ، فسيقوم Logto بربط الحساب بالهوية الاجتماعية تلقائيًا بدلاً من طلب المستخدم لربط الحساب.',
  },
  tip: {
    set_a_password: 'مجموعة فريدة من كلمة المرور لاسم المستخدم الخاص بك ضرورية.',
    verify_at_sign_up:
      'ندعم حاليًا التحقق من البريد الإلكتروني الموثوق. قد يحتوي قاعدة المستخدمين الخاصة بك على عدد كبير من عناوين البريد الإلكتروني ذات جودة منخفضة إذا لم يتم التحقق.',
    password_auth: 'هذا أمر ضروري حيث قمت بتمكين خيار إنشاء كلمة مرور أثناء عملية التسجيل.',
    verification_code_auth:
      'هذا أمر ضروري حيث قمت بتمكين خيار تقديم رمز التحقق عند التسجيل. يمكنك إلغاء التحديد عند السماح بإعداد كلمة المرور في عملية التسجيل.',
    delete_sign_in_method: 'هذا أمر ضروري حيث قمت باختيار {{identifier}} كمعرف مطلوب.',
  },
  advanced_options: {
    title: 'خيارات متقدمة',
    enable_single_sign_on: 'تمكين تسجيل الدخول الموحد للمؤسسة (SSO)',
    enable_single_sign_on_description:
      'تمكين المستخدمين من تسجيل الدخول إلى التطبيق باستخدام تسجيل الدخول الموحد مع هوياتهم في المؤسسة.',
    single_sign_on_hint: {
      prefix: 'انتقل إلى ',
      link: '"تسجيل الدخول الموحد للمؤسسة"',
      suffix: 'لمزيد من إعدادات الموصلات في المؤسسة.',
    },
    enable_user_registration: 'تمكين تسجيل المستخدم',
    enable_user_registration_description:
      'تمكين أو تعطيل تسجيل المستخدم. بمجرد تعطيله ، يمكن للمستخدمين ما زالوا يتم إضافتهم في وحدة التحكم الإدارية ولكن المستخدمين لم يعد بإمكانهم إنشاء حسابات من خلال واجهة تسجيل الدخول.',
    /** UNTRANSLATED */
    unknown_session_redirect_url: 'Unknown session redirect URL',
    /** UNTRANSLATED */
    unknown_session_redirect_url_tip:
      'Sometimes, Logto may not recognize a user’s session on the sign-in page, like when a session expires or the user bookmarks or shares the sign-in link. By default, an “unknown session” 404 error appears. To enhance user experience, set a fallback URL to redirect users back to your app and restart authentication.',
  },
};

export default Object.freeze(sign_up_and_sign_in);
