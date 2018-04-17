module.exports = {
  app: {
    identifier: {
      app_name: 'VNLaw',
      language: 'Ngôn ngữ',
      slogan: 'Always make an awesome support',
      vi: 'Tiếng Việt',
      en: 'Tiếng Anh',
      or: 'HOẶC',
      account: 'Tài khoản của tôi',
      setting: 'Thiết lập',
      home: 'Trang chủ',
      signup: 'Đăng kí',
      login: 'Đăng nhập',
      logout: 'Đăng xuất',
      search: 'Tra cứu luật',
      profile: 'Trang cá nhân',
      login_face: 'Đăng nhập bằng facebook',
      login_google: 'Đăng nhập bằng google',
      read_more: 'xem thêm',
      show_less: 'thu nhỏ',
      no_review: 'Xin lỗi, hiện tại luật sư chưa nhận được đánh giá nào'
    },
    button:{
      create_new_chat: 'Tạo cuộc trò chuyện',
      destroy_room_request: 'Hủy yêu cầu'
    },
    notification:{
      no_noti: 'Hiện tại bạn chưa có thông báo nào',
      new_request_from_other: ' đã gửi cho bạn một yêu cầu',
      new_room_request_title: ' gửi cho bạn yêu cầu tạo cuộc trò chuyện',
      new_accept_room_request_title: ' đã chấp nhận yêu cầu tạo cuộc trò chuyện của bạn',
      new_refuse_room_request_title: ' đã từ chối yêu cầu tạo cuộc trò chuyện của bạn',
      new_accept_room_request: ' đã chấp nhận yêu cầu của bạn',
      new_refuse_room_request: ' đã từ chối yêu cầu của bạn',
      click_here: 'Click để xem chi tiết!',
      already_known: 'Tôi biết rồi',
      cant_create_peer: 'Trình duyệt của bạn không hỗ trợ chức năng này',
      to_chat_room: 'Tới phòng chat',
      time_created: 'Thời gian tạo: ',
      detail: 'Chi tiết:',
      create_dialog: 'Tạo cuộc trò chuyện',
      goto_dialog: 'Đi đến cuộc trò chuyện',
      evaluate: 'Đánh giá:',
      agree_with_case: 'Tôi đồng ý tiếp nhận vụ án',
      disagree_with_case: 'Tôi không đồng ý tiếp nhận vụ án',
      detail: 'Chi tiết:'
    },
    confirm_dialog:{
      title: 'Thông báo',
      message: 'Bạn nhận được một cuộc gọi video',
      confirm_label: 'Đồng ý kết nối',
      cancel_label: 'Từ chối cuộc gọi',
      message_2:'Bạn chắc chắn muốn tiếp tục ?',
      confirm_label_2: 'Tôi đồng ý và muốn tiếp tục.',
      cancel_label_2: 'Tôi sẽ suy nghĩ lại.'
    },
    system_notice:{
      unauthenticated: {
        title: 'Từ chối truy cập',
        text: 'Hãy đăng nhập để tiếp tục dịch vụ!'
      },
      permission_denied:{
        title: 'Từ chối truy cập',
        text: 'Bạn không có quyền truy cập vào đây!'
      },
      warning:{
        title: 'Chú ý',
        text: {
          cancel_call_request: 'Yêu cầu trò chuyện video đã bị hủy.',
          end_call: 'Kết thúc cuộc trò chuyện video.',
          please_fill_the_form: 'Bạn cần điền đầy đủ thông tin'
        }
      },
      success:{
        title: 'Thành công',
        text:{
          submit_form_to_request_room: 'Thông tin của bạn đã được gửi đến luật sư!',
          welcome:'Chào mừng đến với VNLaw.',
          success_update_profile: 'Thông tin của bạn đã được thay đổi.'
        }
      },
      error:{
        title: 'Lỗi',
        text:{cant_create_peer: 'Trình duyệt của bạn không hỗ trợ chức năng này',
          already_been_used: 'Dịch vụ hiện đang được sử dụng.',
          already_login: 'Bạn đã đăng nhập vào hệ thống!',
          invalid_email: 'Bạn hãy chắc chắn email nhập vào là chính xác!',
          user_not_found: 'Bạn hãy chắc chắn email và mật khẩu là chính xác!',
          password_confirm_not_match: 'Mật khẩu xác nhận không khớp!',
          some_thing_not_work: 'Đã có lỗi xảy ra, xin hãy thử lại sau!'
        }
      }
    },
    profile: {
      user_review: 'Đánh giá từ khách hàng',
      view_all: 'Xem tất cả',
      review: 'đánh giá',
      load_more: 'Xem thêm đánh giá'
    },
    home: {
      footer: {
        content: 'VNLaw - LKBC 2017'
      },
      find_box: {
        search: 'Tìm kiếm & đặt hẹn với luật sư',
        title: 'Đặt hẹn dễ dàng với luật sư',
        lawyer_name: 'Tên luật sư',
        lawyer_field: 'Lĩnh vực'
      },
      recent_lawyer: {
        title: 'Luật sư tiêu biểu',
        lawyer_overview: 'Hồ sơ tổng quan',
        hour: ' giờ',
        apply: 'Đặt lịch hẹn tư vấn',
        show_all: 'Xem toàn bộ luật sư'
      },
      get_start: {
        title: 'Bắt đầu đặt lịch tư vấn với luật sư ngay bây giờ',
        button_content: 'Bắt đầu'
      },
      search_law: {
        title: 'Tra cứu luật',
        des: 'Ngoài tư vấn luật bạn cũng có thể tra cứu luật cùng chúng tôi',
        field_1: {
          title: 'Hình sự',
          des: 'Các quy định về tội phạm, xác định hành vi tội phạm và những hình phạt'
        },
        field_2: {
          title: 'Sở hữu trí tuệ',
          des: 'Các quy định về quyền tác giả, quyền sở hữu công nghiệp, và việc bảo hộ các quyền đó.'
        },
        field_3: {
          title: 'Hôn nhân & gia đình',
          des: 'Các quy định pháp luật về đời sống hôn nhân và mối quan hệ trong gia đình'
        },
        field_4: {
          title: 'Nhà đất - Xây dựng',
          des: 'Các vấn đề liên quan tới đất đai,nhà cửa,xây dựng'
        },
        field_5: {
          title: 'Tài chính - Ngân hàng',
          des: 'Những quy định pháp luật về tổ chức và hoạt động các tổ chức tín dụng và hoạt động ngân hàng tổ chức khác'
        },
        field_6: {
          title: 'Dân sự',
          des: 'Những quy định về các quan hệ tài sản và các quan hệ nhân thân, thừa kế'
        },
        field_7: {
          title: 'Lao động - Bảo hiểm xã hội',
          des: 'Các quy định của pháp luật về hợp đồng, tiền lương,độ tuổi,thời gian làm việc'
        },
        field_8: {
          title: 'Doanh nghiệp',
          des: 'Các quy định của pháp luật về hoạt động kinh doanh thương mại,đầu tư doanh nghiệp'
        },
        effect_status_1: 'Còn hiệu lực',
        effect_status_2: 'Hết hiệu lực toàn bộ'
      },
      find_lawyer: 'Trao đổi với luật sư &',
      find_law: 'Tra cứu luật',
      fast: 'nhanh và hiệu quả nhất',
      find: 'Tìm kiếm',
      next: 'trang tiếp',
      previous: 'trang trước',
      schedule: 'Lên kế hoạch',
      connect: 'Kết nối',
      find_content: 'Duyệt qua các hồ sơ luật sư để tìm luật sư phù hợp với bạn. Tất cả các luật sư VNLaw được cấp phép và hoạt động.',
      schedule_content: 'Lên kế hoạch tham khảo ý kiến miễn phí với luật sư địa phương dưới 60 giây ngày hôm nay. Xem ngay các khoảng thời gian có sẵn trong lịch luật sư và nhấp để đặt trước.',
      connect_content: 'Kết nối với luật sư địa phương để tham khảo ý kiến ban đầu một cách nhanh chóng và an toàn. VNLaw sử dụng công nghệ trò chuyện video tiên tiến nhất trên hành tinh. Bạn muốn gặp mặt trực tiếp? Chúng tôi cũng làm như vậy.',
      slogan_1: 'Chúng tôi cung cấp giải pháp',
      slogan_2: 'Giúp bạn giải quyết các khúc mắc về pháp luật một cách đơn giản và nhanh chóng nhất'
    },
    attorney: {
      book: 'Đặt lịch hẹn',
      view_profile: 'Xem hồ sơ',
      hour: ' / h',
      online: 'Sẵn sàng',
      away: 'Tạm nghỉ',
      rate: 'Xếp hạng',
      cost: 'Phí tư vấn',
      sort_by: 'Sắp xếp theo',
      search_placeholder: 'Tìm kiếm theo tên luật sư',
      filter: 'Lọc kết quả theo',
      specialize: 'Lĩnh vực',
      top_view: 'Luật sư được xem nhiều'
    },
    nav: {
      brow_law: 'Tra cứu luật',
      brow_lawyers: 'Tìm kiếm luật sư',
      support: 'Hỗ trợ',
      chat: 'Chat',
      sign_out: 'Đăng xuất',
      setting: 'Thiết lập',
      notification: 'Thông báo',
    },
    login: {
      login_error: 'Sai mật khẩu hoặc email',
      success: 'Đăng nhập thành công',
      username: 'Tên tài khoản',
      email: 'Email',
      password: 'Mật khẩu',
      submit: 'Đăng nhập',
      had_account: 'Đã có tài khoản?'
    },
    signup: {
      signup_error: 'Sai thông tin đăng kí',
      success: 'Đăng kí thành công',
      displayName: 'Tên người dùng',
      password: 'Mật khẩu',
      password_confirmation: 'Xác nhận mật khẩu',
      email: 'Email',
      name: 'Tên người dùng',
      submit: 'Đăng kí',
      new_to_us: 'Thành viên mới?'
    },
    dashboard: {
      home: 'Trang chủ',
      customer: 'Khách hàng',
      file: 'Tệp chia sẻ',
      todo: 'Công việc',
      todo_list: 'Danh sách công việc',
      todo_list_none: 'Bạn chưa có công việc nào cần thực hiện !',
      todo_list_warning: 'Bạn cần nhập nội dung công việc',
      todo_list_with: 'Danh sách công việc của tôi với ',
      todo_title: 'Nội dung công việc',
      todo_add: 'Thêm',
      with: 'Với',
      chat_title: 'Chat với',
      dashboard: 'Dashboard',
      calendar: 'Lịch làm việc',
      note: 'Ghi chú',
      profile: 'Hồ sơ của tôi',
      submit_des: 'Hoàn tất',
      edit_des: 'Chỉnh sửa mô tả',
      chat_setting_des_title: 'Mô tả cuộc trò chuyện',
      search: {
        title: 'Tìm kiếm',
        by_user: 'Tìm kiếm theo người dùng',
        by_tag: 'Tìm kiếm theo hashtag',
        search_user_not_found: 'Không tìm thấy người dùng nào',
        search_user_not_found_symbol: '=.="',
        input_user_name: 'Hãy nhập tên người dùng mà bạn muốn tìm kiếm',
        search_tag_not_found: 'Không tìm thấy kết quả nào',
        search_tag_not_found_symbol: '-_-"',
        result_for: ' kết quả cho ',
        result_relate: ' kết quả liên quan '
      }
    },
    user: {
      list: 'Danh sách người dùng',
      search: 'Tìm kiếm người dùng',
      name: 'Tên người dùng',
      upload: {
        ava: 'Đăng ảnh đại diện'
      },
      edit: {
        ava: 'Chỉnh sửa ảnh đại diện',
        name: 'Chỉnh sửa tên người dùng',
        profile: 'Chỉnh sửa hồ sơ'
      },
      status: {
        online: 'online',
        offline: 'offline',
        away: 'away'
      }
    },
    chat: {
      title: 'Chat',
      input_place_holder: 'Nhập tin nhắn ...',
      my_chat: 'Chat cá nhân',
      todo_list: 'Danh sách công việc',
      shared_files: 'Tệp được chia sẻ',
      shared_images: 'Ảnh được chia sẻ',
      chat_session_list: 'Lịch sử phiên chat',
      rate: 'Đánh giá',
      lawyer_profile: 'Thông tin của luật sư',
      customer_profile: 'Thông tin của khách hàng',
      pay: 'Thanh toán',
      paid: 'Đã thanh toán',
      account_owner: 'Chủ tài khoản',
      money_to_be_paid: 'Số tiền cần thanh toán',
      cancel: 'Hủy',
      pending: 'Đang xử lý',
      warning_file_size: 'Dung lượng file tối đa là 25MB'
    },
    notfound: {
      content: {
        oh: 'Ohh.....',
        main: 'Bạn yêu cầu trang hiện không có.',
        back_home: 'Về trang chủ'
      }
    },
    law: {
      index: 'Mục lục'
    },
    search: {
      founded: 'Tìm thấy',
      results: 'kết quả',
      not_found_symbol: '>_<',
      has: 'Có',
      you_mean: 'Bạn muốn tìm: ',
      search_tool: {
        title: 'Tìm kiếm',
        key_search: 'Từ khóa tìm kiếm',
        filter: {
          filter_1: 'Chính xác cụm từ trên',
          filter_2: 'Có tất cả từ trên'
        },
        order_by: {
          title: 'Sắp xếp theo',
          order_by_1: 'Ngày phát hành',
          order_by_2: 'Ngày có hiệu lực',
          order_by_3: 'Mới tới cũ',
          order_by_4: 'Cũ tới mới'
        }
      },
      category_title: 'Phân loại theo',
      category_organ: {
        title: 'Cơ quan ban hành',
        organ_1: 'Quốc hội',
        organ_2: 'Ủy ban thường vụ quốc hội',
        organ_3: 'Chính phủ',
        organ_4: 'Thủ tướng Chính phủ',
        organ_5: 'Các Bộ, cơ quan ngang Bộ',
        organ_6: 'Các cơ quan khác',
      },
      category_type: {
        title: 'Loại văn bản',
        type_1: 'Hiến pháp',
        type_2: 'Bộ luật',
        type_3: 'Luật',
        type_4: 'Pháp lệnh',
        type_5: 'Lệnh',
        type_6: 'Nghị quyết',
        type_7: 'Nghị quyết liên tịch',
        type_8: 'Nghị định',
        type_9: 'Quyết định',
        type_10: 'Thông tư',
        type_11: 'Thông tư liên tịch'
      },
      category_year: {
        title: 'Năm ban hành',
        year_1: {
          title: '1945 đến 1950',
          from_year: '1945',
          year_mid_1: '1946',
          year_mid_2: '1947',
          year_mid_3: '1948',
          year_mid_4: '1949',
          to_year: '1950',
        },
        year_2: {
          title: '1951 đến 1960',
          from_year: '1951',
          year_mid_1: '1952',
          year_mid_2: '1953',
          year_mid_3: '1954',
          year_mid_4: '1955',
          year_mid_5: '1956',
          year_mid_6: '1957',
          year_mid_7: '1958',
          year_mid_8: '1959',
          to_year: '1960'
        },
        year_3: {
          title: '1961 đến 1970',
          from_year: '1961',
          year_mid_1: '1962',
          year_mid_2: '1963',
          year_mid_3: '1964',
          year_mid_4: '1965',
          year_mid_5: '1966',
          year_mid_6: '1967',
          year_mid_7: '1968',
          year_mid_8: '1969',
          to_year: '1970'
        },
        year_4: {
          title: '1971 đến 1980',
          from_year: '1971',
          year_mid_1: '1972',
          year_mid_2: '1973',
          year_mid_3: '1974',
          year_mid_4: '1975',
          year_mid_5: '1976',
          year_mid_6: '1977',
          year_mid_7: '1978',
          year_mid_8: '1979',
          to_year: '1980'
        },
        year_5: {
          title: '1981 đến 1990',
          from_year: '1981',
          year_mid_1: '1982',
          year_mid_2: '1983',
          year_mid_3: '1984',
          year_mid_4: '1985',
          year_mid_5: '1986',
          year_mid_6: '1987',
          year_mid_7: '1988',
          year_mid_8: '1989',
          to_year: '1990'
        },
        year_6: {
          title: '1991 đến 2000',
          from_year: '1991',
          year_mid_1: '1992',
          year_mid_2: '1993',
          year_mid_3: '1994',
          year_mid_4: '1995',
          year_mid_5: '1996',
          year_mid_6: '1997',
          year_mid_7: '1998',
          year_mid_8: '1999',
          to_year: '2000'
        },
        year_7: {
          title: '2001 đến 2010',
          from_year: '2001',
          year_mid_1: '2002',
          year_mid_2: '2003',
          year_mid_3: '2004',
          year_mid_4: '2005',
          year_mid_5: '2006',
          year_mid_6: '2007',
          year_mid_7: '2008',
          year_mid_8: '2009',
          to_year: '2010'
        },
        year_8: {
          title: '2011 đến 2020',
          from_year: '2011',
          year_mid_1: '2012',
          year_mid_2: '2013',
          year_mid_3: '2014',
          year_mid_4: '2015',
          year_mid_5: '2016',
          year_mid_6: '2017',
          year_mid_7: '2018',
          year_mid_8: '2019'
        }
      }
    },
    payment: {
      title: 'Nhập thông tin thanh toán',
      connect: 'Kết nối luật sư',
      table_input_info: 'Bảng nhập thông tin',
      personal_info: 'Thông tin cá nhân',
      full_name: 'Tên đầy đủ',
      placeholder_name: 'Nguyễn Tiến Trường',
      country: 'Quê quán',
      placeholder_country: 'Hà Nội',
      phone_number: 'Số điện thoại',
      placeholder_phone: '19008198',
      age: 'Tuổi',
      placeholder_age: '19',
      problem: 'Vấn đề gặp phải',
      apply_lawyer: 'Yêu cầu luật sư',
      personal_info_overview: 'Với những thông tin cá nhân cơ bản sẽ giúp chúng tôi hiểu rõ bạn hơn',
      problem_overview: 'Cùng chia sẻ với chúng tôi những vấn đề mà bạn gặp phải',
      pre_step: 'Bước trước',
      recharge: 'Nạp tiền',
      title_recharge: 'Thông tin nạp tiền',
      process: 'Thanh toán',
      success_deposit: 'Chúc mừng bạn đã nạp thành công',
      fail_deposite: 'Giao dịch không tồn tại',
      fail_deposite_1: 'Ngân hàng từ chối giao dịch',
      fail_deposite_3: 'Mã đơn vị không tồn tại',
      fail_deposite_4: 'Không đúng access code',
      fail_deposite_5: 'Số tiền không hợp lệ',
      fail_deposite_6: 'Mã tiền tệ không tồn tại',
      fail_deposite_7: 'Lỗi không xác định',
      fail_deposite_8: 'Số thẻ không đúng',
      fail_deposite_9: 'Tên chủ thẻ không đúng',
      fail_deposite_10: 'Thẻ hết hạn hoặc Thẻ bị khóa',
      fail_deposite_11: 'Thẻ chưa đăng ký sử dụng dịch vụ',
      fail_deposite_12: 'Ngày phát hành/Hết hạn không đúng',
      fail_deposite_13: 'Vượt quá hạn mức thanh toán',
      fail_deposite_21: 'Số tiền không đủ để thanh toán',
      fail_deposite_99: 'Người sử dụng hủy giao dịch',
      fail_deposite_default: 'Giao dịch thất bại'
    },
    lawyer: {
      online_counsel: 'Tư vấn trực tuyến',
      pay_for_hour: 'Chỉ phải trả phí theo giờ',
      card_number: 'Số thẻ làm việc',
      certificate: 'Chứng chỉ hành nghề',
      experience: 'Số năm kinh nghiệm',
      birthday: 'Ngày sinh',
      work_place: 'Nơi làm việc',
      intro: 'Giới thiệu',
      achievement: 'Thành tích',
      education: 'Giáo dục',
      regis_now: 'Đăng kí ngay',
      review: 'Đánh giá từ khách hàng'
    },
    customer: {
      account_type: 'Loại tài khoản:',
      bank_account: 'Số tiền hiện có trong tài khoản'
    },
    modal: {
      account: 'Tài khoản',
      available: 'Hiện có',
      payment: 'Thanh toán',
      last: 'Còn lại',
      money_unit: ' ( VNĐ )',
      note: 'Ghi chú',
      error: 'Tài khoản của bạn hiện không đủ thanh toán'
      
    },
    settings: {
      basic_infor: 'Thông tin cơ bản',
      detail_infor: 'Thông tin chi tiết',
      avatar: 'Ảnh đại diện',
      name: 'Tên',
      user_name: 'Tên người dùng',
      birthday: 'Ngày sinh',
      card_number: 'Số thẻ làm việc',
      certificate: 'Chứng chỉ hành nghề',
      experience: 'Số năm kinh nghiệm',
      change_ava_guide: 'Click để thay đổi ảnh đại diện',
      category: 'Category',
      intro: 'Giới thiệu',
      achievements: 'Thành tích',
      education: 'Giáo dục',
      work_place: 'Nơi làm việc',
      save: 'Lưu',
      payment: 'Thông tin tài khoản',
      acc_balance: 'Số dư tài khoản',
      money_unit: 'VNĐ',
      input_money: 'Nhập số tiền muốn nạp',
      job_done: 'Hoàn tất công việc',
      category_ph: 'Hãy chọn lĩnh vực yêu thích của bạn',
      price: 'Giá tiền tư vấn',
      money_unit: 'VNĐ',
      payment_his: 'Lịch sử thanh toán',
      mn_ipt: 'Số tiền nạp',
      time: 'Thời gian'
    },
    rate: {
      cost_money: 'Giá tiền',
      tips: 'Phản hồi của bạn sẽ giúp chúng tôi phục vụ bạn tốt hơn',
      thanks: 'Cảm ơn bạn !',
      rate_tips: 'Vui lòng đánh giá dịch vụ của chúng tôi',
      rate_done: 'Gửi đánh giá'
    },
    article: {
      numerical_symbol: 'Số ký hiệu',
      article_type: 'Loại văn bản',
      public_day: 'Ngày ban hành',
      effect_day: 'Ngày có hiệu lực',
      source: 'Nguồn thu thập',
      day_report: 'Ngày đăng công báo',
      agency_issued: 'Cơ quan ban hành',
      signer_title: 'Chức danh / Người ký',
      scope: 'Phạm vi',
      expire_day: 'Ngày hết hiệu lực',
      markup: ' Đánh dấu văn bản',
      index: 'Mục lục'
    },
    apply_lawyer: {
      can_not: 'Không thể yêu cầu luật sư'
    }
  }
}
