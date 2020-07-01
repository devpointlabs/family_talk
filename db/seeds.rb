# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |u|
    user = User.create(
        name:Faker::Movies::HarryPotter.character, 
        email:"#{u}@test.com", 
        password:'1234567',
        image: (Faker::Avatar.image(
            slug: (Faker::Hipster.word) , 
            size: "200x200", format: "bmp", 
            set: "set2", bgset: "bg1")),)
            
        end
        
        
        Board.create(name:'Test board 1', description:Faker::TvShows::MichaelScott.quote)
        Board.create(name:'Test board 2', description:Faker::TvShows::MichaelScott.quote)
        Board.create(name:'Test board 3', description:Faker::TvShows::MichaelScott.quote)
        
        
        10.times do |u|
            Post.create(board_id: rand(1..3), user_id: rand(1..5), 
            description:Faker::Hipster.sentence, 
            title:Faker::Hipster.word,
            likes: 20,
            image: (Faker::Avatar.image(
                slug: (Faker::Hipster.word) , 
                size: "200x200", format: "bmp", 
                set: "set1", bgset: "bg1")))
            end
            
            10.times do |b|
                UserBoard.create(board_id: rand(1..3), user_id: rand(1..5))
            end
            
            20.times do |x|
                Comment.create(
                    post_id: rand(1..10), user_id: rand(1..5), description:Faker::GreekPhilosophers.quote)
                    end
            
            
            
                
          puts "seeded"
            
           
           
           
           
           
           
                    # create_table "boards", force: :cascade do |t|
    #     t.string "name"
    #     t.string "description"
    #     t.boolean "public"
    #     t.datetime "created_at", precision: 6, null: false
    #     t.datetime "updated_at", precision: 6, null: false
    #   end
    
    #   create_table "comments", force: :cascade do |t|
    #     t.string "description"
    #     t.bigint "post_id", null: false
    #     t.bigint "user_id", null: false
    #     t.datetime "created_at", precision: 6, null: false
    #     t.datetime "updated_at", precision: 6, null: false
    #     t.index ["post_id"], name: "index_comments_on_post_id"
    #     t.index ["user_id"], name: "index_comments_on_user_id"
    #   end
    
    #   create_table "posts", force: :cascade do |t|
    #     t.string "title"
    #     t.string "description"
    #     t.string "image"
    #     t.bigint "board_id", null: false
    #     t.bigint "post_id", null: false
    #     t.bigint "user_id", null: false
    #     t.integer "likes"
    #     t.datetime "created_at", precision: 6, null: false
    #     t.datetime "updated_at", precision: 6, null: false
    #     t.index ["board_id"], name: "index_posts_on_board_id"
    #     t.index ["post_id"], name: "index_posts_on_post_id"
    #     t.index ["user_id"], name: "index_posts_on_user_id"
    #   end
    
    #   create_table "user_boards", force: :cascade do |t|
    #     t.bigint "board_id", null: false
    #     t.bigint "user_id", null: false
    #     t.datetime "created_at", precision: 6, null: false
    #     t.datetime "updated_at", precision: 6, null: false
    #     t.index ["board_id"], name: "index_user_boards_on_board_id"
    #     t.index ["user_id"], name: "index_user_boards_on_user_id"
    #   end
    
    #   create_table "users", force: :cascade do |t|
    #     t.string "provider", default: "email", null: false
    #     t.string "uid", default: "", null: false
    #     t.string "encrypted_password", default: "", null: false
    #     t.string "reset_password_token"
    #     t.datetime "reset_password_sent_at"
    #     t.boolean "allow_password_change", default: false
    #     t.datetime "remember_created_at"
    #     t.string "confirmation_token"
    #     t.datetime "confirmed_at"
    #     t.datetime "confirmation_sent_at"
    #     t.string "unconfirmed_email"
    #     t.string "name"
    #     t.string "nickname"
    #     t.string "image"
    #     t.string "email"
    #     t.json "tokens"
    #     t.datetime "created_at", precision: 6, null: false
    #     t.datetime "updated_at", precision: 6, null: false
    #     t.integer "sign_in_count", default: 0
    #     t.datetime "current_sign_in_at"
    #     t.datetime "last_sign_in_at"
    #     t.string "current_sign_in_ip"
    #     t.string "last_sign_in_ip"
    #     t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    #     t.index ["email"], name: "index_users_on_email", unique: true
    #     t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    #     t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    #   end