export const SIGN_UP_FIELDS = [
    { name: "firstName", label: "名", type: "text", icon: "fa-user" },
    { name: "lastName", label: "姓", type: "text", icon: "fa-user" },
    {
      name: "email",
      label: "メールアドレス",
      type: "email",
      icon: "fa-envelope",
      colSpan: true,
    },
    {
      name: "password",
      label: "パスワード",
      type: "password",
      icon: "fa-lock",
    },
    {
      name: "confirmPassword",
      label: "パスワード確認",
      type: "password",
      icon: "fa-lock",
    },
  ];
  
  export const GENDER_OPTIONS = ["男性", "女性", "その他"];