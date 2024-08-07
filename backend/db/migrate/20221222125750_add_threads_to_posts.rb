class AddThreadsToPosts < ActiveRecord::Migration[7.0]
  def change
    add_reference :posts, :post_thread, index: true
  end
end
