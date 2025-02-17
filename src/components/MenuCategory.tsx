
interface MenuCategoryProps {
  icon: string;
  name: string;
  itemCount: number;
  color: string;
}

const MenuCategory = ({ icon, name, itemCount, color }: MenuCategoryProps) => {
  return (
    <div className="menu-category" style={{ borderColor: `${color}20` }}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <h3 className="text-lg font-display font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{itemCount} Items</p>
        </div>
      </div>
    </div>
  );
};

export default MenuCategory;
