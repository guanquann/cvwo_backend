class DropVotesCountCol < ActiveRecord::Migration[7.0]
  def change
    remove_column :votes, :count
  end
end
